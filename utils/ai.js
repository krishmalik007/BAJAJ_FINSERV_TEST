const axios = require("axios");

async function askAI(question, apiKey) {
  if (!question || typeof question !== "string") {
    throw new Error("AI requires valid question string");
  }

  if (!apiKey) {
    throw new Error("Gemini API key missing");
  }

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      contents: [
        {
          parts: [
            { text: question + " Answer in one word only." }
          ]
        }
      ]
    },
    {
      params: { key: apiKey },
      headers: { "Content-Type": "application/json" }
    }
  );

  const text =
    response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Invalid response from Gemini API");
  }

  return text.trim().split(/\s+/)[0];
}

module.exports = askAI;
