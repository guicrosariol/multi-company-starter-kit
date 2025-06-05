import type { FastifyInstance } from "fastify";
import { createCompanyController } from "../controllers/create-company-controller";
import { verifyJwt } from "../utils/verify-jwt";
import { createInviteToCompanyController } from "../controllers/create-invite-to-company-controller";
import { acceptInviteCompanyController } from "../controllers/aceept-invite-company-controller";

export function privateRoutes(app: FastifyInstance) {
  app.post('/company', { onRequest: [verifyJwt] }, createCompanyController)
  app.post('/company/invite', { onRequest: [verifyJwt] }, createInviteToCompanyController)
  app.post('/company/invite/accept', { onRequest: [verifyJwt] }, acceptInviteCompanyController)
}