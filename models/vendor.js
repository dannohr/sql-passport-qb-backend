"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define(
    "Vendor",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      qbId: DataTypes.INTEGER,
      VendorName: DataTypes.STRING
    },
    {}
  );
  Vendor.associate = function(models) {
    Vendor.belongsTo(models.Address, {});
  };
  return Vendor;
};
