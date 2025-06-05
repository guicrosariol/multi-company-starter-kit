import { z } from "zod";
import { AuthenticateUserUseCase } from "../../use-case/authenticate-user";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function authenticateUserController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  const { email, password } = requestSchema.parse(request.body)

  const authenticateUserUseCase = new AuthenticateUserUseCase()
  try {
    const result = await authenticateUserUseCase.execute({
      email,
      password
    })

    if (!result.ok) {
      return reply.status(result.error.statusCode).send({ message: result.error.message })
    }

    return reply.status(200).send({ token: result.token })
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}