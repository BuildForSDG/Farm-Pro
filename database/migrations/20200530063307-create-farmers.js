'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Farmers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      farmerNo: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      county: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sub_county: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ward: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      farmerType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assessed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '1',
      },
      pin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Farmers');
  },
};
