const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../config/swagger.json");

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDoc));

module.exports = router;
