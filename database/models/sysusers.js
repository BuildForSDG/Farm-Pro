'use strict';
module.exports = (sequelize, DataTypes) => {
  const SysUsers = sequelize.define(
    'SysUsers',
    {
      password: DataTypes.TEXT,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      last_login: DataTypes.DATE,
      is_active: DataTypes.BOOLEAN,
      is_superuser: DataTypes.BOOLEAN,
      password_status: DataTypes.STRING,
      login_attempts: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      jobRole: DataTypes.STRING,
      department: DataTypes.STRING,
      county: DataTypes.STRING,
      sub_county: DataTypes.STRING,
      ward: DataTypes.STRING,
      address: DataTypes.STRING,
      imageURL: DataTypes.TEXT,
    },
    {}
  );
  SysUsers.associate = function (models) {
    // associations can be defined here
    SysUsers.hasMany(models.Assessments, {
      foreignKey: 'user_id',
      as: 'assessor',
      onDelete: 'CASCADE',
    });
  };
  return SysUsers;
};
