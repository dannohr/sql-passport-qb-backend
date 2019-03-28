"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      roleName: DataTypes.STRING
    },
    {}
  );

  UserRole.associate = function(models) {
    UserRole.belongsToMany(models.UserRight, {
      through: models.UserRoleRight
    });
    UserRole.belongsToMany(models.UserCompany, {
      through: models.UserCompanyRole
    });
  };

  return UserRole;
};
