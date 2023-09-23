const express = require("express");
const router = express.Router();
const shopController = require("../controller/shop.controller");

router.get("/", shopController.findAll);
router.post("/", shopController.create);
router.get("/:id", shopController.findById);
router.put("/:id", shopController.update);
router.delete("/:id", shopController.remove);

module.exports = router;
