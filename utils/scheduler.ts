import nodemailer from "nodemailer";
import schedule from "node-schedule";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "swaggerdk0@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (email: string): void => {
  const mailOptions = {
    from: "Dharmendra <swaggerdk0@gmail.com>",
    to: email,
    subject: "Welcome!",
    text: "Thank you for registering.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const scheduleEmail = (email: string): void => {
  console.log(process.env.EMAIL_PASS);
  const date = new Date(Date.now() + 2 * 60 * 1000); // 10 minutes from now
  schedule.scheduleJob(date, () => {
    sendEmail(email);
  });
};

export default scheduleEmail;
