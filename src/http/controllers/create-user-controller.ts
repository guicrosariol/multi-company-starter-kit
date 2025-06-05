import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../../use-case/create-user";
import { z } from "zod";

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    username: z.string().min(4),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { username, name, email, password } = requestSchema.parse(request.body)

  const createUserUserCase = new CreateUserUseCase()

  try {
    const result = await createUserUserCase.execute({ name, email, password, username });

    if (!result.ok) {
      return reply.status(result.error.statusCode).send({ message: result.error.message });
    }

    return reply.status(201).send({ result: result.user });
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}