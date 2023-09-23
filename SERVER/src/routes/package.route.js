const express = require("express");
const router = express.Router();
const packageController = require("../controller/package.controller");

router.get("/", packageController.findAll);
router.post("/", packageController.create);
router.get("/:id", packageController.findById);
router.put("/:id", packageController.update);
router.delete("/:id", packageController.remove);

module.exports = router;
