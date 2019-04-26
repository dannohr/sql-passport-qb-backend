var express = require("express");
var router = express.Router();

var custCtrl = require("../controllers/custController");
var authCtrl = require("../controllers/authController");
var compCtrl = require("../controllers/compController");
var userCtrl = require("../controllers/userController");
var addrCtrl = require("../controllers/addressController");

var checkAuth = authCtrl.isAuthenticated;

//Non quickbooks routes
router.post("/login", authCtrl.login);
router.get("/me", authCtrl.me);
router.get("/test", (req, res) => res.send("App is working"));

router.get("/user", checkAuth, userCtrl.list);
router.get("/user/:id", checkAuth, userCtrl.getById);
router.post("/user", checkAuth, userCtrl.add);
router.put("/user/:id", checkAuth, userCtrl.update);
router.delete("/user/:id", checkAuth, userCtrl.delete);

router.get("/customer", checkAuth, custCtrl.list);
router.get("/customer/:id", checkAuth, custCtrl.getById);
router.post("/customer", checkAuth, custCtrl.add);
router.put("/customer/:id", checkAuth, custCtrl.update);
router.delete("/customer/:id", checkAuth, custCtrl.delete);

router.get("/company", checkAuth, compCtrl.list);
router.get("/company/:id", checkAuth, compCtrl.getById);
router.post("/company", checkAuth, compCtrl.add);
router.put("/company/:id", checkAuth, compCtrl.update);
router.delete("/company/:id", checkAuth, compCtrl.delete);

router.get("/address", checkAuth, addrCtrl.list);
router.get("/address/:id", checkAuth, addrCtrl.getById);
router.post("/address", checkAuth, addrCtrl.add);
router.put("/address/:id", checkAuth, addrCtrl.update);
router.delete("/address/:id", checkAuth, addrCtrl.delete);

module.exports = router;
