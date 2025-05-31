import fastify from "fastify";
import { env } from "../env";
import { appRoutes } from "./routes";
import { createJwt } from "./utils/create-jwt";

const app = fastify()

app.register(appRoutes)

app.listen({
  port: env.PORT
}).then(() => {
  
  console.log('Server is running! 🚀', env.PORT, createJwt({userId: "8184791e-d3a9-46cc-94ce-3b41eb9738aa"}));
})