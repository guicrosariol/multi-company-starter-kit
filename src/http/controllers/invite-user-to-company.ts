import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InviteUserToCompanyUseCase } from "../../use-case/invite-user-to-company";

export async function inviteUserToCompanyController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    username: z.string(),
    companyId: z.string()
  })

  const { username, companyId } = requestSchema.parse(request.body)

  const inviteUserToCompanyUseCase = new InviteUserToCompanyUseCase()

  try {
    const result = await inviteUserToCompanyUseCase.execute({
      username,
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