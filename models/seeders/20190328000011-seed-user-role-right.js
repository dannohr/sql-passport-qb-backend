"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "UserRoleRight",
      [
        {
          UserRoleId: "1",
          UserRightId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserRoleId: "1",
          UserRightId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserRoleId: "1",
          UserRightId: "3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserRoleId: "2",
          UserRightId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("UserRoleRight", null, {});
  }
};
