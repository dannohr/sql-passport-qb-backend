"use strict";

var expect = require("expect.js");
const db = require("../../models/index");

describe("models/company", function() {
  before(function() {
    return require("../../models").sequelize.sync();
  });

  beforeEach(function() {
    this.Address = db.Address;
    this.Company = db.Company;

    // return Bluebird.all([
    //   this.models.User.destroy({ truncate: { cascade: true } }),
    //   this.models.Task.destroy({ truncate: { cascade: true } })
    // ]);
    return Promise.all([
      this.Address.destroy({ truncate: { cascade: true } }),
      this.Company.destroy({ truncate: { cascade: true } })
    ]);
  });

  describe("create", function() {
    it("creates an Address and then Company", function() {
      return this.Address.create({
        address: "123 Main St",
        city: "Dallas",
        state: "TX"
      })
        .bind(this)
        .then(function(address) {
          return this.Company.create({
            name: "Test Company, Inc.",
            AddressId: address.id
          }).then(function(company) {
            expect(company.name).to.equal("Test Company, Inc.");
          });
        });
    });
  });

  describe("create", function() {
    it("creates a Company, then Address, adds Address to Company", function() {
      return this.Company.create({
        name: "Irv Company, Inc."
      })
        .bind(this)
        .then(function(company) {
          return this.Address.create({
            name: "Irv Company AP Dept",
            address: "999 Apple St",
            city: "Irving",
            state: "TX",
            zip: "12345"
          }).then(function(address) {
            return db.Company.update(
              { AddressId: address.id },
              { where: { id: company.id } }
            ).then(function(result) {
              return db.Company.findAll({
                where: { id: company.id },
                include: [{ model: db.Address }]
              }).then(function(result) {
                expect(result[0].Address.address).to.equal("999 Apple St");
              });
            });
          });
        });
    });
  });
});
