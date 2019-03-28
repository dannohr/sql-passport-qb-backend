var models = require("../models/index");

let tables = [
  "QbSyncLog",
  "Session",
  "UserCompanyRole",
  "Customer",
  "UserRoleRight",
  "Role",
  "UserRight",
  "UserCompany",
  "UserRole",
  "User",
  "Company",
  "Vendor",
  "Address"
];

for (let table of tables) {
  models.sequelize
    .query("DROP TABLE " + table)
    .then(([results, metadata]) => {
      console.log(results);
      console.log(metadata);
    })
    .catch(function(err) {
      console.log(err);
    });
}
