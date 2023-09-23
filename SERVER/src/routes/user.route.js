const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/", userController.findAll);
router.post("/", userController.create);
router.get("/:id", userController.findById);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

module.exports = router;
