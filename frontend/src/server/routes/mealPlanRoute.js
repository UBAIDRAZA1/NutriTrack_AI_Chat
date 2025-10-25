// src/server/routes/mealPlanRoute.js

import express from "express";

import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config({ path: '../../.env' });

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/generate-meal", async (req, res) => {
  const { calorieGoal, dietaryPreference } = req.body;

  if (!calorieGoal || !dietaryPreference) {
    return res.status(400).json({ error: "Missing calorieGoal or dietaryPreference" });
  }

  try {
    const prompt = `
      You are a professional nutritionist. Create a healthy daily meal plan based on:
      - Calorie goal: ${calorieGoal}
      - Dietary preference: ${dietaryPreference}
      Include: breakfast, lunch, dinner.
      Each meal should have:
        - name
        - calories
        - 4-5 ingredients
      Output strictly in JSON format.
    `;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // Fast & free
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const mealPlan = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!mealPlan) {
      return res.status(500).json({ error: "Invalid meal plan format from Groq" });
    }

    res.json(mealPlan);
  } catch (err) {
    console.error("Groq API Error:", err);
    res.status(500).json({ error: "Failed to generate meal plan" });
  }
});

export default router;
