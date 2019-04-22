var express = require("express");
var router = express.Router();

var authCtrlQb = require("../controllers/qbControllers/qbAuthController");
var compCtrlQb = require("../controllers/qbControllers/qbCompController");
var custCtrlQb = require("../controllers/qbControllers/qbCustController");

router.get("/auth", authCtrlQb.auth);
router.get("/callback", authCtrlQb.callback);
router.get("/refresh", authCtrlQb.refresh);
router.get("/revoke", authCtrlQb.revoke);

router.get("/company", compCtrlQb.list);

router.get("/customer", custCtrlQb.list);
router.get("/customer/:id", custCtrlQb.getById);

module.exports = router;
