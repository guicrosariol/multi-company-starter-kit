import type { ErrorType } from "../errors/@type"
import { limitExceededError } from "../errors/limit-exceeded-error"
import { notFoundError } from "../errors/not-found-error"
import { unauthorizedError } from "../errors/unauthorized-error"
import { prisma } from "../lib/prisma"

interface CreatePublicInviteToCompanyRequest {
  adminId: string
  companyId: string
}

type CreatePublicInviteToCompanyResponse =
  { ok: true } |
  { ok: false, error: ErrorType }

export class CreatePublicInviteToCompanyUseCase {
  async execute({
    adminId,
    companyId
  }: CreatePublicInviteToCompanyRequest): Promise<CreatePublicInviteToCompanyResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: adminId
      }
    })

    if (!user) {
      return { ok: false, error: notFoundError('User not found!') }
    }

    const company = await prisma.company.findUnique({
      where: {
        id: companyId
      }
    })

    if (!company) {
      return { ok: false, error: notFoundError('Company not found!') }
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

    await prisma.inviteCompany.create({
      data: {
        companyId,
        status: "pending",
        expires_at: new Date(Date.now() + 60 * 60 * 1000) // expira em 1h
      }
    })

    return { ok: true }
  }
}