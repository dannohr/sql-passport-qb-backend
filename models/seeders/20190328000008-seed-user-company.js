"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "UserCompany",
      [
        {
          UserId: "1",
          CompanyId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: "1",
          CompanyId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: "2",
          CompanyId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: "1",
          CompanyId: "3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: "3",
          CompanyId: "5",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("UserCompany", null, {});
  }
};
