import * as brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const email = new brevo.SendSmtpEmail();
    email.sender = { name: "PaperCraft", email: "papercraft-nyn@outlook.com" };
    email.to = [{ email: to }];
    email.subject = subject;
    email.htmlContent = html;

    const info = await apiInstance.sendTransacEmail(email);
    return info;
  } catch (err) {
    console.error("Email send failed:", err.message);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;