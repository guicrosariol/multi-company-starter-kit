import type { ErrorType } from "../errors/@type"
import { NotFoundError } from "../errors/not-found-error"
import { prisma } from "../lib/prisma"

interface InviteToCompanyRequest {
  companyId: string
  userId: string
}

type InviteToCompanyResponse =
  { ok: true }
  | { ok: false, error: ErrorType }

export class InviteToCompanyUseCase {
  async execute({
    userId,
    companyId
  }: InviteToCompanyRequest): Promise<InviteToCompanyResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return { ok: false, error: NotFoundError() }
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId }
    })

    if (!company) {
      return { ok: false, error: NotFoundError() }
    }

    await prisma.inviteCompany.create({
      data: {
        companyId,
        userId,
      }
    })

    return { ok: true }
  }
}