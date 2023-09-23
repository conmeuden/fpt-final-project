const express = require("express");
const router = express.Router();
const supplierController = require("../controller/supplier.controller");

router.get("/", supplierController.findAll);
router.post("/", supplierController.create);
router.get("/:id", supplierController.findById);
router.put("/:id", supplierController.update);
router.delete("/:id", supplierController.remove);

module.exports = router;
