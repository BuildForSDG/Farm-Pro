module.exports = function (fastify, opts, done) {
  fastify.get('/user', handler_v1);
  done();
};
