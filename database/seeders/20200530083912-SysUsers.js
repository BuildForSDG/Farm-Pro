'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync(process.env.ADMINISTRATOR, 10);

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'SysUsers',
      [
        {
          password: hash,
          firstName: 'Yegon',
          lastName: 'Kipkirui Yegon',
          email: 'ipkiruig83@gmail.com',
          phone: '254722395251',
          is_superuser: '1',
          gender: 'Male',
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('SysUsers', null, {}),
};
