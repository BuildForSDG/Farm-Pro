'use strict';
module.exports = (sequelize, DataTypes) => {
  const Farmers = sequelize.define(
    'Farmers',
    {
      farmerNo: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      county: DataTypes.STRING,
      sub_county: DataTypes.STRING,
      ward: DataTypes.STRING,
      farmerType: DataTypes.STRING,
      assessed: DataTypes.BOOLEAN,
      is_active: DataTypes.BOOLEAN,
      pin: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {}
  );
  Farmers.associate = function (models) {
    // associations can be defined here
  };
  return Farmers;
};
