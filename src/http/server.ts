import fastify from "fastify";
import { env } from "../env";
import { appRoutes } from "./routes";

const app = fastify()

app.register(appRoutes)

app.listen({
  port: env.PORT
}).then(() => {
  console.log('Server is running! 🚀', env.PORT);
})