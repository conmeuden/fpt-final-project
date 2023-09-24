// import
require("dotenv").config();
require("express-async-errors");
require("./src/services/discord.logger");
require("./src/db/db");
const express = require("express");
var bodyParser = require("body-parser");

const initRoute = require("./src/routes/initRoute");

// main
const app = express();

// setup
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
