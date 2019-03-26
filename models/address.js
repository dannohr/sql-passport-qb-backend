"use strict";
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      qbId: {
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING
      },
      address: {
        allowNull: true,
        type: DataTypes.STRING
      },
      city: {
        allowNull: true,
        type: DataTypes.STRING
      },
      state: {
        allowNull: true,
        type: DataTypes.STRING
      },
      zip: {
        allowNull: true,
        type: DataTypes.STRING
      }
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
