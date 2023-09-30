const express = require("express");
const passport = require("passport");
const router = express.Router();
const adminAuthController = require("../controller/auth/adminAuth.controller");
const customerController = require("../controller/auth/customerAuth.controller");
const shopAuthController = require("../controller/auth/shopAuth.controller");

router.post("/admin/login", adminAuthController.login);
router.post("/admin/refresh", adminAuthController.refresh);

router.post("/shop/login", shopAuthController.login);
router.post("/shop/register", shopAuthController.register);
router.post("/shop/refresh", shopAuthController.refresh);
router.post("/shop/google", shopAuthController.loginWithGoogle);

router.post("/customer/login", customerController.login);
router.post("/customer/register", customerController.register);
router.post("/customer/google", customerController.loginWithGoogle);

router.get(
  "/customer/facebook",
  customerController.loginWithFacebook.authenticate("facebook", {
    scope: ["email"],
    session: false,
  })
);
router.get("/customer/facebook/callback", (req, res) => {
  customerController.loginWithFacebook.authenticate(
    "facebook",
    (err, profile, accessToken) => {
      req.user = profile;
      return res.json({ accessToken });
    }
  )(req, res);
});

module.exports = router;
