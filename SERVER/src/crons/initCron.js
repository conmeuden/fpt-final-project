const cron = require("node-cron");
const axios = require("axios");

cron.schedule("*/30 * * * * *", () => {
  axios
    .get("https://backend-dalapha.onrender.com/")
    .then((response) => {
      console.log("Truy cập đánh thức backend");
    })
    .catch((error) => {
      console.error("Error sending request:", error.message);
    });

  axios
    .get("https://admin-dalapha.onrender.com/")
    .then((response) => {
      console.log("Truy cập đánh thức admin page");
    })
    .catch((error) => {
      console.error("Error sending request:", error.message);
    });
});

module.exports = {
  cron,
};
