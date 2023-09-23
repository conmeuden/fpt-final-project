const express = require("express");
const router = express.Router();
const industryController = require("../controller/industry.controller");

router.get("/", industryController.findAll);
router.post("/", industryController.create);
router.get("/:id", industryController.findById);
router.put("/:id", industryController.update);
router.delete("/:id", industryController.remove);

module.exports = router;
