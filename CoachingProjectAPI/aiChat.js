import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Groq from 'groq-sdk';

const router = express.Router();

const apiKey = process.env.GROQ_KEY;

if (!apiKey)
  console.warn("⚠️ GROQ_KEY is missing in environment variables");

const groq = new Groq({ apiKey });

router.post("/aiChat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message)
      return res.status(400).json({ error: "Message is required" });

    if (!process.env.GROQ_KEY)
      return res.status(500).json({ error: "Groq API key not configured" });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI failed" });
  }
});

export default router;