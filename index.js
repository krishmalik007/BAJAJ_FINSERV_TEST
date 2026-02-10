require("dotenv").config();
const express = require("express");
const helmet = require("helmet");

const fibonacci = require("./utils/fibonacci");
const filterPrimes = require("./utils/prime");
const lcmArray = require("./utils/lcm");
const hcfArray = require("./utils/hcf");
const askAI = require("./utils/ai");

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

const PORT = process.env.PORT || 10000;
const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.get("/health", (req, res) => {
  return res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: "Invalid JSON body"
      });
    }

    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: "Exactly one key must be provided"
      });
    }

    const key = keys[0];
    const value = body[key];

    let result;

    switch (key) {
      case "fibonacci":
        result = fibonacci(value);
        break;

      case "prime":
        result = filterPrimes(value);
        break;

      case "lcm":
        result = lcmArray(value);
        break;

      case "hcf":
        result = hcfArray(value);
        break;

      case "AI":
        if (!GEMINI_API_KEY) {
          throw new Error("Gemini API key not configured");
        }
        result = await askAI(value, GEMINI_API_KEY);
        break;

      default:
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          error: "Invalid key provided"
        });
    }

    return res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: result
    });

  } catch (error) {
    return res.status(400).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: error.message
    });
  }
});

const serverless = require("serverless-http");
module.exports = serverless(app);

