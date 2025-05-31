import { prisma } from "../lib/prisma"
import { AlreadyExist } from "../errors/already-exist-error"
import type { ErrorType } from "../errors/@type"
import { hash } from "bcryptjs"

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
}

type CreateUserResponse =
  { ok: true, user: User }
  | { ok: false, error: ErrorType }

export class CreateUserUseCase {
  async execute({
    name,
    email,
    password
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const doesUserExist = await prisma.user.findUnique({
      where: { email }
    })

    if (doesUserExist) {
      return { ok: false, error: AlreadyExist() }
    }

    const password_hash = await hash(password, 6)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash
      }
    });

    return {
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
}