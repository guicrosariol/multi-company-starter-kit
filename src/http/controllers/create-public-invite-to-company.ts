import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreatePublicInviteToCompanyUseCase } from "../../use-case/create-public-invite-to-company";

export async function createPublicInviteToCompanyController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    companyId: z.string().uuid()
  })

  const { companyId } = requestSchema.parse(request.body)

  const createPublicInviteToCompanyUseCase = new CreatePublicInviteToCompanyUseCase()

  try {
    const result = await createPublicInviteToCompanyUseCase.execute({
      adminId: request.user.id,
      companyId
    })

    if (!result.ok) {
      return reply.status(result.error.statusCode).send({ message: result.error.message })
    }

    return reply.status(201).send()
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}