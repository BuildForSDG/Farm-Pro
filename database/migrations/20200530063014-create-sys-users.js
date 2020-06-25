'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SysUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      last_login: {
        type: Sequelize.DATE,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '1',
      },
      is_superuser: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
      },
      password_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Change',
      },
      login_attempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobRole: {
        type: Sequelize.STRING,
      },
      department: {
        type: Sequelize.STRING,
      },
      county: {
        type: Sequelize.STRING,
      },
      sub_county: {
        type: Sequelize.STRING,
      },
      ward: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      imageURL: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('SysUsers');
  },
};
