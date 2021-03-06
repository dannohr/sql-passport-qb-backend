"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Customer", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      qbId: { type: Sequelize.INTEGER },
      Active: { type: Sequelize.BOOLEAN },
      Balance: { type: Sequelize.DECIMAL(10, 2) },
      CustomerName: { type: Sequelize.STRING },
      SyncToken: { type: Sequelize.INTEGER },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ShippingAddressId: {
        onDelete: "CASCADE",
        type: Sequelize.INTEGER,
        references: {
          model: "Address",
          key: "id"
        },
        allowNull: true
      },
      BillingAddressId: {
        onDelete: "CASCADE",
        type: Sequelize.INTEGER,
        references: {
          model: "Address",
          key: "id"
        },
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Customer");
  }
};
