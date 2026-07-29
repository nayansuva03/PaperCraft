import express from "express";
import mongoose from "mongoose";
import User from "./mongodb/users.js";
import Feedback from "./mongodb/feedback.js";
import cors from "cors";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

//--for mongodb
app.post("/api/users", async (req, res) => {
  console.log("/api/users was called.");
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    const saved = await newUser.save();

    res.status(200).json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/feedback", async (req, res) => {
  console.log("/api/feedback was called.");

  try {
    if (!req.body.username && !req.body.guestName) {
      return res.status(400).json({
        success: false,
        message: "Username or Guest Name is required.",
      });
    }

    if (!req.body.rating) {
      return res.status(400).json({
        success: false,
        message: "Rating required.",
      });
    }
    const newFeedback = new Feedback(req.body);

    const saved = await newFeedback.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/api/feedback", async (req, res) => {
  try {
    const allFeedback = await Feedback.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: allFeedback,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.delete("/api/feedback/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
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
