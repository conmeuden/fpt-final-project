const nodemailer = require("nodemailer");

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
    const mailOptions = {
      from: process.env.MAILSYSTEM_EMAIL,
      to,
      subject,
      text,
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
    const mailOptions = {
      from: process.env.MAILSYSTEM_EMAIL,
      to: listEmail.join(","),
      subject,
      text,
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
