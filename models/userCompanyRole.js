"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserCompanyRole = sequelize.define(
    "UserCompanyRole",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      companyRole: { type: DataTypes.STRING }
    },
    {}
  );

  UserCompanyRole.associate = function(models) {
    // UserCompanyRole.belongsTo(models.UserCompany, {});
  };

  return UserCompanyRole;
};
