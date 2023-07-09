export default async function (fastify, opts) {
  
  fastify.get('/:sectionId', async function (request, reply) {
    return await fastify.jsonDb.getObjectDefault(`/dossier/${request?.params?.dossierId}`, {})
      .then((dossier) => ({
        ...(dossier?.['section']?.[request?.params?.sectionId] || {}),
        id: request?.params?.sectionId,
      }))
      .catch(err => {
        fastify.logger.error(err);
        reply.statusCode = 404;
        return err;
      });
  })

  fastify.put('/:sectionId', async function (request, reply) {
    await fastify.jsonDb.push(`/dossier/${request?.params?.dossierId}/section/${request?.params?.sectionId}`, request?.body)
      .then(() => {
        reply.statusCode = 204;
        return null;
      })
      .catch(err => {
        fastify.logger.error(err);
        reply.statusCode = 404;
        return null;
      });
  })
}
