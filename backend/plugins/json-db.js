import fp from 'fastify-plugin';
import { JsonDB, Config } from 'node-json-db';


export default fp(async (fastify, options) => {
  fastify.decorate('jsonDb', fastify.jsonDb ||  new JsonDB(
    new Config(
      options?.filename || "db",
      options?.saveOnPush !== false,
      options?.humanReadable !== false,
      options?.separator || '/',
      options?.syncOnSave !== false
    )
  ));
});