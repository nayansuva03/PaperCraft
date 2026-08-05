import { GoogleGenAI } from "@google/genai";

  const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function askGemini(req, res) {

  try {
    const prompt = req.body.prompt;
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

export default askGemini;
