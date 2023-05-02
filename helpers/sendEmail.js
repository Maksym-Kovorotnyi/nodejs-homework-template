const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAIL_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: "465",
  secure: true,
  auth: {
    user: "kovorotnyi@meta.ua",
    pass: MAIL_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const mail = {
    from: "kovorotnyi@meta.ua",
    ...data,
  };
  await transport.sendMail(mail);
  return true;
};

module.exports = sendEmail;
