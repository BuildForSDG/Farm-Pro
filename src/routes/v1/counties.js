const db = require('../../../database/models/index.js');

const optsCounties = {
  schema: {
    description: 'Endpoint Route to get Kenyan Counties',
    tags: ['counties'],
    summary: 'Return a list of of 47 counties in Kenya',
    response: {
      200: {
        description: 'Success Response',
        content: 'application/json',
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                countyName: { type: 'string' },
              },
            },
          },
        },
      },
      400: {
        description: 'Error Response',
        content: 'application/json',
        type: 'object',
        properties: {
          status: { type: 'string' },
          error: { type: 'string' },
        },
      },
      404: {
        description: 'Not Found Response',
        content: 'application/json',
        type: 'object',
        properties: {
          status: { type: 'string' },
          error: { type: 'string' },
        },
      },
    },
  },
};

const optsSubcounties = {
  schema: {
    description: 'Endpoint Route to get SubCounties in a particular County',
    tags: ['Sub Counties'],
    summary: 'Return a list of Sub Counties in the given County',
    querystring: {
      type: 'object',
      properties: {
        countyName: { type: 'string' },
      },
      required: ['countyName'],
    },

    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                subCountyName: { type: 'string' },
              },
            },
          },
        },
      },
      400: {
        description: 'Error Response',
        content: 'application/json',
        type: 'object',
        properties: {
          status: { type: 'string' },
          error: { type: 'string' },
        },
      },
      404: {
        description: 'Not Found Response',
        content: 'application/json',
        type: 'object',
        properties: {
          status: { type: 'string' },
          error: { type: 'string' },
        },
      },
    },
  },
};

const optsWards = {
  schema: {
    description:
      'Endpoint Route to get Wards in a particular County and SubCounty respectively',
    tags: ['Wards'],
    summary: 'Return a list of ward or wards in the given sub county',
    querystring: {
      countyName: { type: 'string' },
      subCounty: { type: 'string' },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                ward: { type: 'string' },
              },
            },
          },
        },
      },
      400: {
        description: 'Error Response',
        content: 'application/json',
        type: 'object',
        properties: {
          status: { type: 'string' },
          error: { type: 'string' },
        },
      },
      404: {
        description: 'Not Found Response',
        content: 'application/json',
        type: 'object',
        properties: {
          status: { type: 'string' },
          error: { type: 'string' },
        },
      },
    },
  },
};

module.exports = function (fastify, options, done) {
  fastify.get('/counties', optsCounties, async (request, reply) => {
    const counties = await db.Counties.findAll({
      attributes: [
        [
          db.Sequelize.fn('DISTINCT', db.Sequelize.col('countyName')),
          'countyName',
        ],
      ],
      order: [['countyName', 'ASC']],

      // raw: true,
    });

    if (counties.length === 0) {
      reply
        .code(404)
        .header('Content-Type', 'application/json')
        .send({ status: 'error', error: 'Not Found' });
    } else {
      reply
        .code(200)
        .header('Content-Type', 'application/json')
        .send({ status: 'success', data: counties });
    }
  });
  fastify.get('/subcounties', optsSubcounties, async (req, reply) => {
    const subCounties = await db.Counties.findAll({
      attributes: [
        [
          db.Sequelize.fn('DISTINCT', db.Sequelize.col('sub_county_name')),
          'subCountyName',
        ],
      ],
      order: [['sub_county_name', 'ASC']],
      where: {
        countyName: req.query.countyName.toUpperCase(),
      },
      // raw: true,
    });

    if (subCounties.length === 0) {
      reply
        .code(404)
        .header('Content-Type', 'application/json')
        .send({ status: 'error', error: 'Not Found' });
    } else {
      reply
        .code(200)
        .header('Content-Type', 'application/json')
        .send({ status: 'success', data: subCounties });
    }
  });
  fastify.get('/wards', optsWards, async (req, reply) => {
    const wards = await db.Counties.findAll({
      attributes: [
        [db.Sequelize.fn('DISTINCT', db.Sequelize.col('ward_Name')), 'ward'],
      ],
      order: [['ward_Name', 'ASC']],
      where: {
        countyName: req.query.countyName.toUpperCase(),
        sub_county_name: req.query.subcounty.toUpperCase(),
      },
      // raw: true,
    });

    if (wards.length === 0) {
      reply
        .code(404)
        .header('Content-Type', 'application/json')
        .send({ status: 'error', error: 'Not Found' });
    } else {
      reply
        .code(200)
        .header('Content-Type', 'application/json')
        .send({ status: 'success', data: wards });
    }
  });
  done();
};

// module.exports = countyRoutes;
