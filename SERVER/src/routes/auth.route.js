const express = require("express");
const router = express.Router();
const adminAuthController = require("../controller/auth/adminAuth.controller");
const customerController = require("../controller/auth/customerAuth.controller");
const shopAuthController = require("../controller/auth/shopAuth.controller");

router.post("/admin/login", adminAuthController.login);

router.post("/shop/login", shopAuthController.login);

router.post("/customer/login", customerController.login);

module.exports = router;
