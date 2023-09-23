const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");

router.get("/", categoryController.findAll);
router.post("/", categoryController.create);
router.get("/:id", categoryController.findById);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.remove);

module.exports = router;
