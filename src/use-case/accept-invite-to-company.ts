import type { ErrorType } from "../errors/@type";
import { alreadyExists } from "../errors/already-exist-error";
import { expiredError } from "../errors/expired-error";
import { notFoundError } from "../errors/not-found-error";
import { userAlreadyHasAccessError } from "../errors/user-already-has-access-error";
import { prisma } from "../lib/prisma";

interface AcceptInviteToCompanyRequest {
  inviteId: string
  userId: string
}

type AcceptInviteToCompanyResponse =
  { ok: false, error: ErrorType } |
  { ok: true }

export class AcceptInviteToCompanyUseCase {
  async execute({
    inviteId,
    userId
  }: AcceptInviteToCompanyRequest): Promise<AcceptInviteToCompanyResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      return { ok: false, error: notFoundError('User not found!') }
    }

    const invite = await prisma.inviteCompany.findUnique({
      where: {
        id: inviteId
      }
    })

    if (!invite) {
      return { ok: false, error: notFoundError('Invite not found!') }
    }

    const isExpired = invite.expires_at < new Date()

    if (isExpired) {
      await prisma.inviteCompany.update({
        where: {
          id: inviteId
        },
        data: {
          status: "expired"
        }
      })

      return { ok: false, error: expiredError() }
    }

    const userAlreadyHasAccess = await prisma.userCompany.findFirst({
      where: {
        companyId: invite.companyId,
        userId
      }
    })

    if (userAlreadyHasAccess) {
      return { ok: false, error: userAlreadyHasAccessError() }
    }

    const alreadyHasPendingOrAcceptedInvite = await prisma.inviteCompany.findFirst({
      where: {
        id: { not: inviteId },
        companyId: invite.companyId,
        username: user.username,
        status: { in: ["pending", "accepted"] }
      }
    })

    if (alreadyHasPendingOrAcceptedInvite) {
      return { ok: false, error: alreadyExists("User already has a pending or accepted invite!") }
    }

    await prisma.inviteCompany.update({
      where: {
        id: inviteId
      },
      data: {
        username: user.username,
        status: "accepted"
      }
    })

    await prisma.userCompany.create({
      data: {
        companyId: invite.companyId,
        userId,
        role: "member"
      }
    })

    return { ok: true }
  }
}