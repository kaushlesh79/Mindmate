const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Chat endpoint
app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "mistralai/mistral-7b-instruct",
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error("OpenRouter Error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
