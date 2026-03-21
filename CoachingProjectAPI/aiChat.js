import dotenv from 'dotenv';
dotenv.config(); // yahan bhi zaruri hai

import express from "express";
import OpenAI from "openai";

const router = express.Router();

const apiKey = process.env.OPENAI_KEY;

if (!apiKey) {
  console.warn("⚠️ OPENAI_KEY is missing in environment variables");
}

const openai = new OpenAI({
  apiKey: apiKey || "dummy-key"
});

router.post("/aiChat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.OPENAI_KEY) {
      return res.status(500).json({ error: "OpenAI API key not configured" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // ✅ "gpt-5-nano" exist nahi karta, yeh fix kiya
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI failed" });
  }
});

export default router;