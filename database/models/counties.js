'use strict';
module.exports = (sequelize, DataTypes) => {
  const Counties = sequelize.define(
    'Counties',
    {
      countyCode: DataTypes.STRING,
      countyName: DataTypes.STRING,
      sub_county_code: DataTypes.STRING,
      sub_county_name: DataTypes.STRING,
      ward_code: DataTypes.STRING,
      ward_Name: DataTypes.STRING,
    },
    {}
  );
  Counties.associate = function (models) {
    // associations can be defined here
  };
  return Counties;
};
