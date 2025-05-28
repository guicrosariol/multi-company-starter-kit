import fastify from "fastify";
import { env } from "../env";

const app = fastify()

app.listen({
  port: env.PORT
}).then(() => {
  console.log('Server is running! 🚀', env.PORT);
})