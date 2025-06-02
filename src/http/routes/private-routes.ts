import type { FastifyInstance } from "fastify";
import { createCompanyController } from "../controllers/create-company-controller";
import { verifyJwt } from "../utils/verify-jwt";

export function privateRoutes(app: FastifyInstance) {
  app.post('/company', { onRequest: [verifyJwt] }, createCompanyController)
}