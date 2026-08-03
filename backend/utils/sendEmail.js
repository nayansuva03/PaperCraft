import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, html) => {
  const resend = new Resend(process.env.RESEND_API_KEY); // create it INSIDE the function
  await resend.emails.send({
    from: "PaperCraft <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
};

export default sendEmail;
