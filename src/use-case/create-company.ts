import type { ErrorType } from "../errors/@type"
import { alreadyExists } from "../errors/already-exist-error"
import { limitExceededError } from "../errors/limit-exceeded-error"
import { notFoundError } from "../errors/not-found-error"
import { prisma } from "../lib/prisma"

interface CreateCompanyRequest {
  adminId: string
  cnpj: string
}

interface Company {
  id: string
  adminId: string
  cnpj: string
}

type CreateCompanyResponse =
  { ok: true, company: Company }
  | { ok: false, error: ErrorType }


export class CreateCompanyUseCase {
  async execute({
    adminId,
    cnpj
  }: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: adminId
      }
    })

    if (!user) {
      return { ok: false, error: notFoundError('Admin not found!') }
    }

    const doesCompanyExist = await prisma.company.findUnique({
      where: {
        cnpj
      }
    })

    if (doesCompanyExist) {
      return { ok: false, error: alreadyExists('Company already exist!') }
    }

    const countUserCompanies = await prisma.company.count({
      where: {
        adminId
      }
    })

    if (user.max_companies <= countUserCompanies) {
      return { ok: false, error: limitExceededError() }
    }

    const company = await prisma.company.create({
      data: {
        adminId,
        cnpj,
        max_user: 1,
      }
    })
    
    await prisma.userCompany.create({
      data: {
        companyId: company.id,
        userId: adminId,
        role: 'admin'
      }
    })

    return { ok: true, company }
  }
}