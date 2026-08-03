import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "PaperCraft <nayan.suva.ahir.0369@gmail.com>",
  to,
  subject,
  html,
});
