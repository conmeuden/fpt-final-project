// import
require("dotenv").config();
require("express-async-errors");
require("./src/services/discord.logger");
require("./src/config/database.config");
const express = require("express");
var bodyParser = require("body-parser");
const initRoute = require("./src/routes/initRoute");
const cors = require("cors"); // Import thư viện CORS

const jwtAuthMiddleware = require("./src/middlewares/jwtAuth.middleware");
// main
const app = express();

// setup
app.use(cors());
app.use("/api", jwtAuthMiddleware);
app.use(express.static("public"));
app.use(bodyParser.json());
initRoute(app);

// init server
app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO FPT FINAL PROJECT" });
});

const port = process.env.SYSTEM_PORT;
app.listen(port, () => {
  console.log(`App is running`);
});
