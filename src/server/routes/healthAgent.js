// src/server/routes/healthAgent.js

import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ reply: "No prompt provided" });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // fast free Groq model
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0]?.message?.content || "No response from AI";
    res.json({ reply });
  } catch (err) {
    console.error("Groq Chat Error:", err);
    res.status(500).json({ reply: "Something went wrong with AI" });
  }
});

export default router;
