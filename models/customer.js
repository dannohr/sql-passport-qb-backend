"use strict";
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      qbId: DataTypes.INTEGER,
      Active: DataTypes.BOOLEAN,
      Balance: DataTypes.DECIMAL(10, 2),
      CustomerName: DataTypes.STRING,
      SyncToken: DataTypes.INTEGER
    },
    {}
  );
  Customer.associate = function(models) {
    Customer.belongsTo(models.Address, {
      as: "ShippingAddress",
      foreignKey: "ShippingAddressId"
    });
    Customer.belongsTo(models.Address, {
      as: "BillingAddress",
      foreignKey: "BillingAddressId"
    });
  };
  return Customer;
};
