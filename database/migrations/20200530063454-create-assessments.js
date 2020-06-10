'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      farmerNo: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Farmers', // name of Target model
          key: 'farmerNo', // key in Target model that we're referencing
        },
      },
      email: {
        type: Sequelize.STRING,
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
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sub_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      village: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      family: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.TEXT,
      },
      longitude: {
        type: Sequelize.TEXT,
      },
      farmerType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageURL: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'SysUsers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
      assessment_date: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
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
    return queryInterface.dropTable('Assessments');
  },
};
