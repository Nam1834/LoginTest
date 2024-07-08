const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  servive: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "doanskt1genshin@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
