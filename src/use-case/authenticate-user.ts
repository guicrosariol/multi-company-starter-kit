import { compare } from "bcryptjs"
import type { ErrorType } from "../errors/@type"
import { prisma } from "../lib/prisma"
import { createJwt } from "../http/utils/create-jwt"
import { unauthorizedError } from "../errors/unauthorized-error"

interface AuthenticateUserRequest {
  email: string
  password: string
}

type AuthenticateUserResponse =
  { ok: false, error: ErrorType } |
  { ok: true, token: string }

export class AuthenticateUserUseCase {
  async execute({
    email,
    password
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return { ok: false, error: unauthorizedError('Invalid credentials') }
    }

    const passwordCorrect = await compare(password, user.password_hash)

    if (!passwordCorrect) {
      return { ok: false, error: unauthorizedError('Invalid credentials') }
    }

    const token = createJwt({ userId: user.id })

    return { ok: true, token }
  }
}