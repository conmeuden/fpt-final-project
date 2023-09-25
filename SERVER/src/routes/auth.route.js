const express = require("express");
const router = express.Router();
const adminAuthController = require("../controller/auth/adminAuth.controller");
const customerController = require("../controller/auth/customerAuth.controller");
const shopAuthController = require("../controller/auth/shopAuth.controller");

router.post("/admin/login", adminAuthController.login);

router.post("/shop/login", shopAuthController.login);
router.post("/shop/register", shopAuthController.register);

router.post("/customer/login", customerController.login);
router.post("/customer/register", customerController.register);

module.exports = router;
