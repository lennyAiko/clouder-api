require("dotenv").config();

module.exports.mail = {
  // default: process.env.MAIL_MAILER,
  default: "smtp",
  mailers: {
    log: {
      transport: "log",
    },
    resend: {
      transport: "resend",
      apiKey: process.env.RESEND_API_KEY,
    },
    smtp: {
      transport: "smtp",
      host: process.env.MAIL_HOST,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
      port: process.env.MAIL_PORT,
      secure: true,
    },
  },
  from: {
    address: process.env.MAIL_ADDRESS,
    name: process.env.MAIL_NAME,
  },
};
