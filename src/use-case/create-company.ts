import type { ErrorType } from "../errors/@type"
import { alreadyExists } from "../errors/already-exist-error"
import { limitExceededError } from "../errors/limit-exceeded-error"
import { notFoundError } from "../errors/not-found-error"
import { prisma } from "../lib/prisma"

interface CreateCompanyRequest {
  ownerId: string
  cnpj: string
}

interface Company {
  id: string
  ownerId: string
  cnpj: string
}

type CreateCompanyResponse =
  { ok: true, company: Company }
  | { ok: false, error: ErrorType }


export class CreateCompanyUseCase {
  async execute({
    ownerId,
    cnpj
  }: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: ownerId
      }
    })

    if (!user) {
      return { ok: false, error: notFoundError('Owner not found!') }
    }

    if (user.max_companies <= user.count_companies) {
      return { ok: false, error: limitExceededError() }
    }

    const doesCompanyExist = await prisma.company.findUnique({
      where: {
        cnpj
      }
    })

    if (doesCompanyExist) {
      return { ok: false, error: alreadyExists('Company already exist!') }
    }

    const company = await prisma.company.create({
      data: {
        ownerId,
        cnpj,
        max_user: 1,
        count_user: 1
      }
    })

    return { ok: true, company }
  }
}