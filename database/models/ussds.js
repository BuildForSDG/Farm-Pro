'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ussds = sequelize.define(
    'Ussds',
    {
      sessionId: DataTypes.STRING,
      serviceCode: DataTypes.STRING,
      level: DataTypes.INTEGER,
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      county: DataTypes.STRING,
      scounty: DataTypes.STRING,
      ward: DataTypes.STRING,
      ftype: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {}
  );
  Ussds.associate = function (models) {
    // associations can be defined here
  };
  return Ussds;
};
