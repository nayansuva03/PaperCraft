import express from "express";
import cors from "cors";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import sendEmail from "./utils/sendEmail.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(cookieParser());

app.use("/api/feedback", feedbackRoutes);
app.use("/api/auth", authRoutes);

const upload = multer({
  storage: multer.memoryStorage(),
});

app.get("/test-email", async (req, res) => {
  try {
    await sendEmail(
      "pathlessnyn@gmail.com",
      "PaperCraft Test",
      "<h2>Email is working! 🎉</h2>",
    );

    res.send("Email sent.");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

//--for gemini
app.post("/api/generate", upload.single("pdf"), (req, res) => {
  console.log("/api/generate was called.");
  LLMFunction(req, res);
});

app.get("/", (req, res) => {
  res.send("✅ Backend running...");
});

app.listen(5000, () => {
  console.log("✅ server is running...");
});

async function LLMFunction(req, res) {
  console.log("LLMFunction was called");
  try {
    const prompt = req.body.prompt;
    //multer puted the file in req.file that's why i am not writing req.body.file
    if (!req.file) {
      return res.status(400).json({
        message: "No PDF uploaded.",
      });
    }
    const base64PDF = req.file.buffer.toString("base64");

    const response = await genAi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64PDF,
              },
            },
            {
              text: `${prompt}`,
            },
          ],
        },
      ],
    });
    console.log("got a response");
    console.log("response.text : " + response.text);

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedContent;

    try {
      parsedContent = JSON.parse(text);
    } catch {
      return res.status(500).json({
        message: "Gemini returned invalid JSON.",
        rawResponse: text,
      });
    }
    //again uper thi aavta bhangbhosda ne redable banave

    res.status(200).json(parsedContent);
    //"res.json()"(function from express js not just .json();) converts the js object into plain text to it can pass it.
    //leter in frontend normal .json() function will convert it back to js object.
    //number khali raikha se mane maja aave etle remove karso fer ny pade.
  } catch (error) {
    console.log(error);
    res.status(500).json({
      //aa number important se error mate etle aane na kadhta.
      message: "Failed to generate content(From server.js).",
      error: error.message,
    });
  }
}
