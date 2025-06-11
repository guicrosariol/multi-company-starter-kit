import type { FastifyReply, FastifyRequest } from "fastify";
import { AcceptInviteToCompanyUseCase } from "../../use-case/accept-invite-to-company";
import { z } from "zod";

export async function acceptInviteToCompanyController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    inviteId: z.string().uuid(),
  })

  const { inviteId } = requestSchema.parse(request.body)

  const acceptInviteToCompanyUseCase = new AcceptInviteToCompanyUseCase()

  try {
    const result = await acceptInviteToCompanyUseCase.execute({
      userId: request.user.id,
      inviteId
    })

    if (!result.ok) {
      return reply.status(result.error.statusCode).send({ message: result.error.message })
    }

    return reply.status(200).send()
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}