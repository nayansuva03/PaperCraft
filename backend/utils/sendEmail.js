import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // or host/port config
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  family: 4, // force IPv4
});

try {
  await transporter.verify();
  console.log("✅ SMTP Connected");
} catch (err) {
  console.error("❌ SMTP Error:", err);
}

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"PaperCraft" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;
