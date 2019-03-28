"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Vendor", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      qbId: { type: Sequelize.INTEGER },

      VendorName: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      AddressId: {
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
    return queryInterface.dropTable("Vendor");
  }
};
