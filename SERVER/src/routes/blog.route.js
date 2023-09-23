const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");

router.get("/", blogController.findAll);
router.post("/", blogController.create);
router.get("/:id", blogController.findById);
router.put("/:id", blogController.update);
router.delete("/:id", blogController.remove);

module.exports = router;
