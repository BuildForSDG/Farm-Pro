const fastify = require('fastify')({
  logger: true,
});
require('dotenv').config();

const port = process.env.PORT || 80;

const helmet = require('fastify-helmet');

fastify.register(require('fastify-cors'), {
  origin: '*',
  credentials: true,
});

fastify.register(helmet);

fastify.setErrorHandler(function (error, request, reply) {
  console.log(error.message);
  if (error.validation) {
    reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ status: 'error', error: error.message });
  } else if (error.message == 'Not Found') {
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ status: 'error', error: 'Not Found' });
  } else {
    reply
      .code(500)
      .header('Content-Type', 'application/json')
      .send({ status: 'error', error: 'Something went wrong' });
  }
});

fastify.register(function (instance, options, done) {
  instance.setNotFoundHandler(function (request, reply) {
    //console.log(request.err);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ status: 'error', error: 'Not Found' });
  });
  done();
});

fastify.register(require('fastify-swagger'), {
  routePrefix: 'api/documentation',
  swagger: {
    info: {
      title: 'Farm Pro app',
      description: 'api endpoints for farm pro app',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: process.env.HOST || 'localhost:3001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json', 'text/plain'],
  },
  exposeRoute: true,
});

fastify.register(require('./ussd/v1/ussd'), { prefix: '/v1' });

fastify.register(require('./routes/v1/counties'), { prefix: 'api/v1' });

const start = async () => {
  try {
    await fastify.listen(port);
    fastify.swagger();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
