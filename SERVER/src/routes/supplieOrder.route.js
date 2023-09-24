const express = require("express");
const router = express.Router();
const supplieOrderController = require("../controller/supplieOrder.controller");

router.get("/", supplieOrderController.findAll);
router.post("/", supplieOrderController.create);
router.get("/:id", supplieOrderController.findById);
router.put("/:id", supplieOrderController.update);
router.delete("/:id", supplieOrderController.remove);

module.exports = router;
