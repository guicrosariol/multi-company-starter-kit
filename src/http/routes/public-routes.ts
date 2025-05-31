import type { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/create-user-controller";

export function publicRoutes(app: FastifyInstance) {
  app.post('/user', createUserController)
}