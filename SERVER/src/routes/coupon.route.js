const express = require("express");
const router = express.Router();
const couponController = require("../controller/coupon.controller");

router.get("/", couponController.findAll);
router.post("/", couponController.create);
router.get("/id/:id", couponController.findById);
router.get("/:code", couponController.findByCode);
router.put("/:id", couponController.update);
router.delete("/:id", couponController.remove);

module.exports = router;
