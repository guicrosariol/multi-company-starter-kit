import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../../use-case/create-user";
import { z } from "zod";

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = requestSchema.parse(request.body)

  const createUserUserCase = new CreateUserUseCase()

  try {
    const result = await createUserUserCase.execute({ name, email, password });

    if (!result.ok) {
      return reply.status(result.error.statusCode).send({ message: result.error.message });
    }

    return reply.status(201).send({ user: result.user });
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}