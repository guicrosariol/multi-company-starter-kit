import type { FastifyInstance } from "fastify";
import { createCompanyController } from "../controllers/create-company-controller";

export function privateRoutes(app: FastifyInstance) {
  app.post('/company', createCompanyController)
}