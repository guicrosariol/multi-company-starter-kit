import type { FastifyInstance } from "fastify";
import { createCompanyController } from "../controllers/create-company-controller";
import { verifyJwt } from "../utils/verify-jwt";
import { inviteUserToCompanyController } from "../controllers/invite-user-to-company";
import { createPublicInviteToCompanyController } from "../controllers/create-public-invite-to-company";

export function privateRoutes(app: FastifyInstance) {
  app.post('/company', { onRequest: [verifyJwt] }, createCompanyController)
  app.post('/company/invite/user', { onRequest: [verifyJwt] }, inviteUserToCompanyController)
  app.post('/company/invite/public', { onRequest: [verifyJwt] }, createPublicInviteToCompanyController)
}