const express = require("express");
const router = express.Router();
const ratingController = require("../controller/rating.controller");

router.get("/", ratingController.findAll);
router.post("/", ratingController.create);
router.get("/:id", ratingController.findById);
router.put("/:id", ratingController.update);
router.delete("/:id", ratingController.remove);

module.exports = router;
