const nodemailer = require("nodemailer");
require('dotenv').config();
const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'valluruharshitha2005@gmail.com' ,
      pass: process.env.EMAIL_PASS || 'jgvolosbjofxwpda',
    },
     tls: {
    rejectUnauthorized: false,
  },
  });

  await transporter.sendMail({
    from: `"CareerHub" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
