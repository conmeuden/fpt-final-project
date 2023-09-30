import AxiosService from "./axios.service";

const EmailService = {
  sendSingleMail: async ({ to, subject, text }) => {
    await AxiosService.post({
      url: "api/send-mail/single",
      data: { to, subject, text },
    });
  },
  sendMultipleMail: async ({ listEmail, subject, text }) => {
    await AxiosService.post({
      url: "api/send-mail/multiple",
      data: { listEmail, subject, text },
    });
  },
};

export default EmailService;
