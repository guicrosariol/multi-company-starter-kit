import type { ErrorType } from "../errors/@type"
import { alreadyExists } from "../errors/already-exist-error"
import { limitExceededError } from "../errors/limit-exceeded-error"
import { notFoundError } from "../errors/not-found-error"
import { unauthorizedError } from "../errors/unauthorized-error"
import { userAlreadyHasAccessError } from "../errors/user-already-has-access-error"
import { prisma } from "../lib/prisma"

interface InviteUserToCompanyRequest {
  adminId: string
  username: string
  companyId: string
}

type InviteUserToCompanyResponse =
  { ok: true } |
  { ok: false, error: ErrorType }

export class InviteUserToCompanyUseCase {
  async execute({
    username,
    adminId,
    companyId
  }: InviteUserToCompanyRequest): Promise<InviteUserToCompanyResponse> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      }
    })

    if (!user) {
      return { ok: false, error: notFoundError("User not found!") }
    }

    const company = await prisma.company.findUnique({
      where: {
        id: companyId
      }
    })

    if (!company) {
      return { ok: false, error: notFoundError('Company not found!') }
    }

    const userAlreadyHasAccess = await prisma.userCompany.findFirst({
      where: {
        companyId,
        userId: user.id
      }
    })

    if (userAlreadyHasAccess) {
      return { ok: false, error: userAlreadyHasAccessError() }
    }

    const isAdmin = await prisma.userCompany.findFirst({
      where: {
        companyId,
        userId: adminId
      }
    })

    if (!isAdmin || isAdmin.role !== "admin") {
      return { ok: false, error: unauthorizedError() }
    }

    const pendingInvites = await prisma.inviteCompany.count({
      where: {
        companyId,
        status: "pending"
      }
    })

    const countUserCompanies = await prisma.company.count({
      where: {
        adminId
      }
    })

    const totalUsersAndInvites = pendingInvites + countUserCompanies

    if (totalUsersAndInvites >= company.max_user) {
      return { ok: false, error: limitExceededError() }
    }

    const inviteToUserAlreadyExists = await prisma.inviteCompany.findFirst({
      where: {
        companyId,
        username,
        status: { notIn: ["rejected", "expired"] }
      }
    })

    if (inviteToUserAlreadyExists) {
      return { ok: false, error: alreadyExists("Invite already exists!") }
    }

    await prisma.inviteCompany.create({
      data: {
        companyId,
        username,
        status: "pending",
        expires_at: new Date(Date.now() + 60 * 60 * 1000) // expira em 1h
      }
    })

    return { ok: true }
  }
}