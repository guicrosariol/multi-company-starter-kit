import type { ErrorType } from "../errors/@type"
import { limitExceededError } from "../errors/limit-exceeded-error"
import { notFoundError } from "../errors/not-found-error"
import { userAlreadyHasAccessError } from "../errors/user-already-has-access-error"
import { prisma } from "../lib/prisma"

interface AcceptInviteCompanyRequest {
  inviteId: string
  userId: string
}

type AcceptInviteCompanyResponse =
  { ok: false, error: ErrorType } |
  { ok: true }

export class AcceptInviteCompanyUseCase {
  async execute({
    inviteId,
    userId
  }: AcceptInviteCompanyRequest): Promise<AcceptInviteCompanyResponse> {
    const invite = await prisma.inviteCompany.findUnique({
      where: { id: inviteId }
    })

    if (!invite) {
      return { ok: false, error: notFoundError('Invite not found!') }
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return { ok: false, error: notFoundError('User not found!') }
    }

    if (invite.username !== null && invite.username !== user.username) {
      return { ok: false, error: notFoundError('Invite does not belong to this user.') }
    }

    const userAlreadyHasAccess = await prisma.userCompany.findFirst({
      where: {
        companyId: invite.companyId,
        userId: user.id
      }
    })

    if (userAlreadyHasAccess) {
      return { ok: false, error: userAlreadyHasAccessError() }
    }

    try {
      await prisma.$transaction(async (tx) => {
        const company = await tx.company.findUnique({
          where: { id: invite.companyId }
        })

        if (!company) {
          throw notFoundError();
        }

        if (company.count_user >= company.max_user) {
          throw limitExceededError();
        }

        await tx.company.update({
          where: { id: invite.companyId },
          data: {
            count_user: company.count_user + 1
          }
        })

        await tx.inviteCompany.update({
          where: { id: inviteId },
          data: {
            status: 'accepted',
            ...(invite.username === null ? { username: user.username } : {})
          }
        })

        await tx.userCompany.create({
          data: {
            companyId: invite.companyId,
            userId: user.id
          }
        })
      })

      return { ok: true }
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'statusCode' in err) {
        return { ok: false, error: err as ErrorType }
      }

      return { ok: false, error: notFoundError('Unexpected error') }
    }
  }
}