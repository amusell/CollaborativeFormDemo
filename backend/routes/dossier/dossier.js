import { v4 as uuidv4 } from 'uuid';

import SectionRoute from './section/section.js';

export default async function (fastify, opts) {
  const RESOURCE = 'dossier';
  fastify.get('', async function (request, reply) {
    return await fastify.jsonDb.getObjectDefault(`/${RESOURCE}`, {})
      .then(dossierMap => Object.entries(dossierMap).map(([id, {sections, ...data}]) => ({...data, id})))
      .catch(err => {
        fastify.logger.error(err);
        reply.statusCode = 404;
        return err;
      });
  })
  
  fastify.get('/:dossierId', async function (request, reply) {
    return await fastify.jsonDb.getData(`/${RESOURCE}/${request.params.dossierId}`)
      .then(({sections, ...data}) => ({...data, id: request.params.dossierId}))
      .catch(err => {
        fastify.logger.error(err);
        reply.statusCode = 404;
        return err;
      });
  })

  fastify.delete('/:dossierId', async function (request, reply) {
    return await fastify.jsonDb.delete(`/${RESOURCE}/${request.params.dossierId}`)
      .then(() => {
        reply.statusCode = 204;
        return null;
      })
      .catch(err => {
        fastify.logger.error(err);
        reply.statusCode = 404;
        return err;
      });
  })

  fastify.post('/', async function (request, reply) {
    const id = uuidv4();
    return await fastify.jsonDb.push(`/${RESOURCE}/${id}`, {
      userId: request.headers['x-user-id'],
      userName: request.headers['x-user-name'],
      creationDt: new Date(),
    })
    .then(() => {
      reply.statusCode = 201;
    })
    .then(() => ({
      id
    }))    
    .catch(err => {
      fastify.logger.error(err);
      reply.statusCode = 404;
      return err;
    });
  })

  fastify.register(SectionRoute, { prefix: '/:dossierId/section' });
}
