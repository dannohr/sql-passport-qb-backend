var express = require("express");
var router = express.Router();

import { custCtrl, authCtrl, compCtrl, userCtrl } from "../controllers";
var checkAuth = authCtrl.isAuthenticated;

router.post("/login", authCtrl.login);
router.get("/me", authCtrl.me);

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

module.exports = router;
