'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assessments = sequelize.define(
    'Assessments',
    {
      farmerNo: DataTypes.STRING,
      email: DataTypes.STRING,
      county: DataTypes.STRING,
      sub_county: DataTypes.STRING,
      ward: DataTypes.STRING,
      location: DataTypes.STRING,
      sub_location: DataTypes.STRING,
      village: DataTypes.STRING,
      family: DataTypes.STRING,
      latitude: DataTypes.TEXT,
      longitude: DataTypes.TEXT,
      farmerType: DataTypes.STRING,
      gender: DataTypes.STRING,
      imageURL: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      assessment_date: DataTypes.DATE,
    },
    {}
  );
  Assessments.associate = function (models) {
    // associations can be defined here
    Assessments.belongsTo(models.Farmers, {
      foreignKey: 'farmerNo',
      as: 'assesedFarmer',
      onDelete: 'CASCADE',
    });
  };
  return Assessments;
};
