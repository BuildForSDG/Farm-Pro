'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Counties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      countyCode: {
        type: Sequelize.STRING,
      },
      countyName: {
        type: Sequelize.STRING,
      },
      sub_county_code: {
        type: Sequelize.STRING,
      },
      sub_county_name: {
        type: Sequelize.STRING,
      },
      ward_code: {
        type: Sequelize.STRING,
      },
      ward_Name: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Counties');
  },
};
