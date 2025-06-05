import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AcceptInviteCompanyUseCase } from "../../use-case/accept-invite-company";

export async function acceptInviteCompanyController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    inviteId: z.string(),
  })

  const { inviteId } = requestSchema.parse(request.body)

  const acceptInviteCompanyUseCase = new AcceptInviteCompanyUseCase()

  try {
    const result = await acceptInviteCompanyUseCase.execute({
      inviteId,
      userId: request.user.id
    })

    if (!result.ok) {
      return reply.status(result.error.statusCode).send({ message: result.error.message })
    }

    return reply.status(200).send()
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}