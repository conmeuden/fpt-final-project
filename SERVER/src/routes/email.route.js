const express = require("express");
const router = express.Router();
const EmailController = require("../controller/email.controller");

router.post("/single", EmailController.sendSingleMail);
router.post("/multiple", EmailController.sendMultipleMail);

module.exports = router;
