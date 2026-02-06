import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { authRoutes } from "./auth/auth.routes";

async function start() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true });

  await app.register(jwt, { secret: "supersecret" });

  await app.register(swagger, {
    openapi: {
      info: {
        title: "TaskSaga API",
        description: "Fastify + Prisma Auth API",
        version: "1.0.0",
      },
    },
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: { docExpansion: "list" },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });

  app.register(authRoutes);

  app.get("/", async () => ({
    message: "Welcome to TaskSaga API",
    docs: "http://127.0.0.1:3000/docs",
  }));

  try {
    await app.listen({ port: 3000 });
    console.log("Server running on http://127.0.0.1:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
