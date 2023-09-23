const express = require("express");
const router = express.Router();
const shopUserController = require("../controller/shopUser.controller");

router.get("/", shopUserController.findAll);
router.post("/", shopUserController.create);
router.get("/:id", shopUserController.findById);
router.put("/:id", shopUserController.update);
router.delete("/:id", shopUserController.remove);

module.exports = router;
