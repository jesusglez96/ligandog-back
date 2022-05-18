import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/register", async function (request, reply) {
    return { root: true };
  });
  fastify.post("/login", async function (request, reply) {
    return { root: true };
  });
  fastify.post("/get-user", async function (request, reply) {
    return { root: true };
  });
  fastify.post("/i-like-user", async function (request, reply) {
    return { root: true };
  });
  fastify.post("/all-got-like-users", async function (request, reply) {
    return { root: true };
  });
  fastify.post("/all-i-like-users", async function (request, reply) {
    return { root: true };
  });
  fastify.post("/matches", async function (request, reply) {
    return { root: true };
  });
  // Next two endpoints is to handle bad entries points
  fastify.all("/", async function (request, reply) {
    return reply.notFound("You shouldn't be here.");
  });
  fastify.all("/*", async function (request, reply) {
    return reply.notFound("You shouldn't be here.");
  });
};

export default root;
