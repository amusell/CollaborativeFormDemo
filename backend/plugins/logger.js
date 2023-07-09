import fp from 'fastify-plugin';
import { Logger } from "@marketto/js-logger";

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

export default fp(async (fastify, opts) => {
  fastify.decorate('logger', new Logger({
    error: true,
    info: true,
    debug: false,
    warn: true,
    ...(opts || {})
  }))
})
