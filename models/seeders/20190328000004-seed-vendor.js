"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

    return queryInterface.bulkInsert(
      "Vendor",
      [
        {
          VendorName: "Vendor Number 1",
          createdAt: new Date(),
          updatedAt: new Date(),
          AddressId: 4
        },
        {
          VendorName: "Vendor Number 2",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */

    return queryInterface.bulkDelete("Vendor", null, {});
  }
};
