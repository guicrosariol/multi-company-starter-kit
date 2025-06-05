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
      return { ok: false, error: notFoundError('Company not found!') };
    }

    if (company.count_user >= company.max_user) {
      return { ok: false, error: limitExceededError() };
    }

    const pendingInvites = await prisma.inviteCompany.count({
      where: {
        companyId,
        status: 'pending' 
      }
    })
    
    const totalExpectedUsers = company.count_user + pendingInvites;
    
    if (totalExpectedUsers >= company.max_user) {
      return { ok: false, error: limitExceededError() };
    }

    if (username) {
      const user = await prisma.user.findUnique({
        where: { username }
      });

      if (!user) {
        return { ok: false, error: notFoundError('User not found!') };
      }

      const thisUserAlreadyHasAccess = await prisma.userCompany.findFirst({
        where: {
          companyId,
          userId: user.id
        }
      })

      if (thisUserAlreadyHasAccess) {
        return { ok: false, error: userAlreadyHasAccessError() }
      }

      const doesInviteAlreadyExist = await prisma.inviteCompany.findFirst({
        where: {
          companyId,
          username
        }
      })

      if (doesInviteAlreadyExist) {
        return { ok: false, error: alreadyExists('Invite already exists!') }
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
