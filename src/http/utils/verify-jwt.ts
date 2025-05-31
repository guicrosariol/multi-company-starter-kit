import jwt from "jsonwebtoken"
import { env } from "../../env"
import type { FastifyRequest, FastifyReply } from "fastify"

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.status(401).send({ error: "Invalid credentials!" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload
    request.user = { id: decoded.userId }
  } catch (err) {
    return reply.status(401).send({ error: "Invalid token!" })
  }
}