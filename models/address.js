"use strict";
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
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

  Address.associate = models => {
    Address.hasMany(models.Customer, { foreignKey: "ShippingAddressId" });
    Address.hasMany(models.Customer, { foreignKey: "BillingAddressId" });
    Address.hasMany(models.Company, {});
    Address.hasMany(models.Vendor, {});
  };

  return Address;
};
