"use strict";
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      name: DataTypes.STRING
    },
    {}
  );

  Company.associate = models => {
    // Company.hasMany(models.UserCompany, {});
    Company.belongsToMany(models.User, {
      through: models.UserCompany
    });
  };

  return Company;
};
