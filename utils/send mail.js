import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // 👈 add this (true only if port is 465)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve('./views/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      // text: text,
      template: 'email', // name of the template file i.e email.handlebars
      context: {
        otp: text
      }
    });

    console.log("✅ Email sent successfully", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

export default sendEmail;
