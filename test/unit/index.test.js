"use strict";

var expect = require("expect.js");
const db = require("../../models/index");

describe("models/index", function() {
  it("returns the Address model", function() {
    expect(db.Address).to.be.ok();
  });

  it("returns the Company model", function() {
    expect(db.Company).to.be.ok();
  });

  it("returns the Customer model", function() {
    expect(db.Customer).to.be.ok();
  });

  it("returns the QbSyncLog model", function() {
    expect(db.QbSyncLog).to.be.ok();
  });

  it("returns the Role model", function() {
    expect(db.Role).to.be.ok();
  });

  it("returns the Session model", function() {
    expect(db.Session).to.be.ok();
  });

  it("returns the User model", function() {
    expect(db.User).to.be.ok();
  });

  it("returns the UserCompany model", function() {
    expect(db.UserCompany).to.be.ok();
  });

  it("returns the UserCompanyRole model", function() {
    expect(db.UserCompanyRole).to.be.ok();
  });

  it("returns the UserRight model", function() {
    expect(db.UserRight).to.be.ok();
  });

  it("returns the UserRole model", function() {
    expect(db.UserRole).to.be.ok();
  });

  it("returns the UserRoleRight model", function() {
    expect(db.UserRoleRight).to.be.ok();
  });

  it("returns the Vendor model", function() {
    expect(db.Vendor).to.be.ok();
  });
});
