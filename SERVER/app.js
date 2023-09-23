require("dotenv").config();
require("express-async-errors");
const express = require("express");

const logger = require("./src/services/discord.logger");
const db = require("./src/db/db");
const initRoute = require("./src/routes/initRoute");

const app = express();

initRoute(app);

app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO FPT FINAL PROJECT" });
});

const port = process.env.SYSTEM_PORT;
app.listen(port, () => {
  console.log(`App is running`);
});
