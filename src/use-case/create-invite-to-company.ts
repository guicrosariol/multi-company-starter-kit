import type { ErrorType } from "../errors/@type"
import { alreadyExists } from "../errors/already-exist-error"
import { limitExceededError } from "../errors/limit-exceeded-error"
import { notFoundError } from "../errors/not-found-error"
import { userAlreadyHasAccessError } from "../errors/user-already-has-access-error"
import { prisma } from "../lib/prisma"

interface CreateInviteToCompanyRequest {
  companyId: string
  username?: string
}

type CreateInviteToCompanyResponse =
  { ok: true }
  | { ok: false, error: ErrorType }

export class CreateInviteToCompanyUseCase {
  async execute({
    username,
    companyId
  }: CreateInviteToCompanyRequest): Promise<CreateInviteToCompanyResponse> {
    const company = await prisma.company.findUnique({
      where: { id: companyId }
    });

    if (!company) {
      return { ok: false, error: notFoundError() };
    }

    if (company.count_user >= company.max_user) {
      return { ok: false, error: limitExceededError() };
    }

    if (username) {
      const user = await prisma.user.findUnique({
        where: { username }
      });

      if (!user) {
        return { ok: false, error: notFoundError('User not found!') };
      }

      const thisUserIsOwner = await prisma.company.findFirst({
        where: {
          id: companyId,
          ownerId: user.id
        }
      })

      if (thisUserIsOwner) {
        return { ok: false, error: userAlreadyHasAccessError() }
      }

      const doesInviteAlreadyExist = await prisma.inviteCompany.findFirst({
        where: {
          companyId,
          username
        }
      })

      if (doesInviteAlreadyExist) {
        return { ok: false, error: alreadyExists('Invite already exist!') }
      }
    }

    await prisma.inviteCompany.create({
      data: {
        companyId,
        username: username ?? null
      }
    });

    return { ok: true };
  }
}
