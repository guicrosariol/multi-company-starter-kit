import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateCompanyUseCase } from "../../user-case/create-company";

export async function createCompanyController(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    cnpj: z.string(),
  })

  const { cnpj } = requestSchema.parse(request.body)

  const createCompanyUseCase = new CreateCompanyUseCase()

  try {
    const result = await createCompanyUseCase.execute({
      ownerId: 'example', //TODO:
      cnpj,
    })

    if (!result.ok) {
      return reply.status(result.error.statusCode).send({ message: result.error.message })
    }

    return reply.status(201).send({ result: result.company })
  } catch (err) {
    return reply.status(400).send(err)
  }
}