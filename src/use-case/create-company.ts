import type { ErrorType } from "../errors/@type"
import { AlreadyExist } from "../errors/already-exist-error"
import { NotFoundError } from "../errors/not-found-error"
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
    const doesUserExist = await prisma.user.findUnique({
      where: {
        id: ownerId
      }
    })

    if (!doesUserExist) {
      return { ok: false, error: NotFoundError('Owner not found!') }
    }

    const doesCompanyExist = await prisma.company.findUnique({
      where: {
        cnpj
      }
    })

    if (doesCompanyExist) {
      return { ok: false, error: AlreadyExist('Company already exist!') }
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