import type { FastifyInstance } from "fastify";
import { privateRoutes } from "./private-routes";
import { publicRoutes } from "./public-routes";

export function appRoutes(app: FastifyInstance) {
  return privateRoutes(app), publicRoutes(app)
}