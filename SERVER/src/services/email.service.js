const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const readEjsFile = (link, data) => {
  try {
    // Use __dirname to get the directory of the current module
    const templatePath = path.join(__dirname, link);
    const template = fs.readFileSync(templatePath, "utf8");
    return ejs.render(template, data);
  } catch (error) {
    console.error("Error reading EJS file:", error.message);
    return null;
  }
};

class EmailService {
  constructor() {
    // Cấu hình Nodemailer
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILSYSTEM_EMAIL,
        pass: process.env.MAILSYSTEM_PASSWORD,
      },
    });
  }

  // Gửi email đến một địa chỉ
  sendSingleEmail({ to, subject, text }) {
    const htmlContent = readEjsFile("../emailTemplate/base.template.ejs", {
      text,
    });

    const mailOptions = {
      from: process.env.MAILSYSTEM_EMAIL,
      to,
      subject,
      html: htmlContent,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }

  // Gửi email đến nhiều địa chỉ
  sendMultipleEmails({ listEmail, subject, text }) {
    const htmlContent = readEjsFile("../emailTemplate/base.template.ejs", {
      text,
    });
    const mailOptions = {
      from: process.env.MAILSYSTEM_EMAIL,
      to: listEmail.join(","),
      subject,
      html: htmlContent,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
}

module.exports = new EmailService();
