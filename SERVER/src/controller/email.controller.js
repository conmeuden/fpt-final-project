const EmailService = require("../services/email.service");
const { log } = require("../services/discord.logger");
const sendSingleMail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const result = await EmailService.sendSingleEmail({ to, subject, text });
    res.status(200).json({ message: "Email sent", response: result.response });
  } catch (error) {
    log("Lỗi gửi single mail : " + error);
    res.status(500).json({ message: error.toString() });
  }
};

const sendMultipleMail = async (req, res) => {
  try {
    const { listEmail, subject, text } = req.body;

    if (!listEmail || !subject || !text) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const result = await EmailService.sendMultipleEmails({
      listEmail,
      subject,
      text,
    });
    res.status(200).json({ message: "Emails sent", response: result.response });
  } catch (error) {
    log("Lỗi gửi multiple mail : " + error);
    res.status(500).json({ message: error.toString() });
  }
};

module.exports = {
  sendMultipleMail,
  sendSingleMail,
};
