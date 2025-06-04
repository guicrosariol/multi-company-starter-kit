import fastify from "fastify";
import { env } from "../env";
import { appRoutes } from "./routes";
import { createJwt } from "./utils/create-jwt";

const app = fastify()

app.register(appRoutes)

app.listen({
  port: env.PORT
}).then(() => {
  
  console.log('Server is running! 🚀', env.PORT, createJwt({userId: "77924552-227c-420f-a3f5-dd85fcde1e7d"}));
})