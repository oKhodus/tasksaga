import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { randomInt } from "crypto";

const generateCode = () => randomInt(100000, 999999).toString();

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/auth/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "username", "email", "password"],
          properties: {
            name: { type: "string" },
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        response: {
          201: { type: "object", properties: { message: { type: "string" } } },
          400: { type: "object", properties: { message: { type: "string" } } },
        },
      },
    },
    async (req, reply) => {
      const { name, username, email, password } = req.body as any;

      const existing = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
      });

      if (existing)
        return reply.code(400).send({ message: "User already exists" });

      const code = generateCode();

      await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: await bcrypt.hash(password, 10),
          isVerified: false,
          verificationCode: code,
          codeExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });

      console.log("VERIFICATION CODE:", code);
      return reply.code(201).send({ message: "Check your email" });
    },
  );

  app.post(
    "/auth/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["identifier", "password"],
          properties: {
            identifier: { type: "string" },
            password: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: { access_token: { type: "string" } },
          },
          401: { type: "object", properties: { message: { type: "string" } } },
          403: { type: "object", properties: { message: { type: "string" } } },
        },
      },
    },
    async (req, reply) => {
      const { identifier, password } = req.body as any;

      const user = await prisma.user.findFirst({
        where: identifier.includes("@")
          ? { email: identifier }
          : { username: identifier },
      });

      if (!user || !(await bcrypt.compare(password, user.password)))
        return reply.code(401).send({ message: "Invalid credentials" });

      if (!user.isVerified)
        return reply.code(403).send({ message: "Email not verified" });

      const token = app.jwt.sign({ sub: user.email });
      return { access_token: token };
    },
  );

  app.post(
    "/auth/verify",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "code"],
          properties: {
            email: { type: "string" },
            code: { type: "string" },
          },
        },
        response: {
          200: { type: "object", properties: { message: { type: "string" } } },
          400: { type: "object", properties: { message: { type: "string" } } },
        },
      },
    },
    async (req, reply) => {
      const { email, code } = req.body as any;

      const user = await prisma.user.findUnique({ where: { email } });

      if (
        !user ||
        user.verificationCode !== code ||
        !user.codeExpiresAt ||
        user.codeExpiresAt < new Date()
      )
        return reply.code(400).send({ message: "Invalid or expired code" });

      await prisma.user.update({
        where: { email },
        data: { isVerified: true, verificationCode: null, codeExpiresAt: null },
      });

      return { message: "Account verified" };
    },
  );
}
