const cron = require("node-cron");
const axios = require("axios");

cron.schedule("*/30 * * * * *", () => {
  axios.get("https://backend-dalapha.onrender.com/");

  axios.get("https://admin-dalapha.onrender.com/");

  axios.get("https://shop-dalapha.onrender.com/");
});

module.exports = {
  cron,
};
