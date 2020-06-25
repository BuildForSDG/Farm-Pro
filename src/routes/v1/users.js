module.exports = function (fastify, opts, done) {
  fastify.post('/user', async (request, reply) => {});
  fastify.get('/user/:id', async (request, reply) => {});
  fastify.get('/users', async (request, reply) => {});
  done();
};
