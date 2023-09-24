const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");

router.get("/", blogController.findAll);
router.get("/id/:id", blogController.findById);
router.get("/:slug", blogController.findBySlug);
router.post("/", blogController.create);
router.put("/:id", blogController.update);
router.delete("/:id", blogController.remove);

module.exports = router;
