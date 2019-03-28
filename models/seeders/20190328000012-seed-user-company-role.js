"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "UserCompanyRole",
      [
        {
          UserCompanyId: "1",
          UserRoleId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserCompanyId: "2",
          UserRoleId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserCompanyId: "4",
          UserRoleId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserCompanyId: "3",
          UserRoleId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("UserCompanyRole", null, {});
  }
};
