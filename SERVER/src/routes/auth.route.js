const express = require("express");
const passport = require("passport");
const router = express.Router();
const adminAuthController = require("../controller/auth/adminAuth.controller");
const customerController = require("../controller/auth/customerAuth.controller");
const googleAuthController = require("../controller/auth/googleAuth.controller");
const shopAuthController = require("../controller/auth/shopAuth.controller");

router.post("/admin/login", adminAuthController.login);
router.post("/admin/refresh", adminAuthController.refresh);

router.post("/shop/login", shopAuthController.login);
router.post("/shop/register", shopAuthController.register);

router.post("/customer/login", customerController.login);
router.post("/customer/register", customerController.register);

module.exports = router;

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

router.use(
  passport.session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

router.use(passport.initialize());
router.use(passport.session());
