import { z } from "zod";
import { CreateInviteToCompanyUseCase } from "../../use-case/create-invite-to-company";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function createInviteToCompanyController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    username: z.string().optional(),
    companyId: z.string()
  })

  const { username, companyId } = requestSchema.parse(request.body)
  const createInviteToCompanyUseCase = new CreateInviteToCompanyUseCase()

  try {
    const result = await createInviteToCompanyUseCase.execute({
      username,
      companyId
    })

    if (!result.ok) {
      return reply.status(result.error.statusCode).send({ message: result.error.message })
    }

    return reply.status(200).send()
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}