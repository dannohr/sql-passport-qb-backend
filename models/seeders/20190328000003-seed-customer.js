"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

    return queryInterface.bulkInsert(
      "Customer",
      [
        {
          CustomerName: "Customer Number 1",
          createdAt: new Date(),
          updatedAt: new Date(),
          ShippingAddressId: 2,
          BillingAddressId: 3
        },
        {
          CustomerName: "Customer Number 2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          CustomerName: "Customer Number 3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          CustomerName: "Customer Number 4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          CustomerName: "Customer Number 5",
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

    return queryInterface.bulkDelete("Customer", null, {});
  }
};
