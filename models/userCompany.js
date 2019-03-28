"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserCompany = sequelize.define(
    "UserCompany",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      }
    },
    {}
  );

  UserCompany.associate = function(models) {
    UserCompany.belongsToMany(models.UserRole, {
      through: models.UserCompanyRole
    });
  };

  return UserCompany;
};
