// const { blogpostDb } = require("../db");
const db = require("../models/index");
/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint as part of creating the blogpost, add them to this service
 */
const allUsers = () => {
  db.Customer.findAll().then(customer => {
    if (customer != null) {
      console.log("companies found in db in customerService");
      console.log(customer);

      return {
        isAuthenticated: true,
        message: "all Customers in db",
        customer: customer
      };
    } else {
      console.error("no companies exist");
      return { message: "no companies exists in db" };
    }
  });
};

module.exports = {
  allUsers
};
