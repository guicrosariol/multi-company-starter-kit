import jwt from "jsonwebtoken"
import { env } from "../../env"

interface JwtPayload {
  userId: string
}

export function createJwt({
  userId
}: JwtPayload) {

  const payload = { userId }
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '1d'
  })
}