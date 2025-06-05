import type { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/create-user-controller";
import { authenticateUserController } from "../controllers/authenticate-user-controller";

export function publicRoutes(app: FastifyInstance) {
  app.post('/user', createUserController)
  app.post('/authenticate', authenticateUserController)
}