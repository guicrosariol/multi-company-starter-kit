import { prisma } from "../lib/prisma"
import type { ErrorType } from "../errors/@type"
import { hash } from "bcryptjs"
import { alreadyExists } from "../errors/already-exist-error"

interface CreateUserRequest {
  name: string
  username: string
  email: string
  password: string
}

interface User {
  id: string
  username: string
  name: string
  email: string
}

type CreateUserResponse =
  { ok: true, user: User }
  | { ok: false, error: ErrorType }

export class CreateUserUseCase {
  async execute({
    name,
    username,
    email,
    password
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const doesUserExist = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (doesUserExist) {
      return { ok: false, error: alreadyExists() }
    }

    const password_hash = await hash(password, 6)

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password_hash,
        max_companies: 0,
      }
    });

    return {
      ok: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email
      }
    };
  }
}