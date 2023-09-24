const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");

router.get("/", orderController.findAll);
router.post("/", orderController.create);
router.get("/:id", orderController.findById);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.remove);

module.exports = router;
