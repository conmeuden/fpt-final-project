const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");

router.get("/", productController.findAll);
router.post("/", productController.create);
router.get("/:id", productController.findById);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

module.exports = router;
