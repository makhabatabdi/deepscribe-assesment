import express from "express";
import { OpenAI } from "openai";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { transcript } = req.body;

  if (
    !transcript ||
    typeof transcript !== "string" ||
    transcript.trim().length < 10
  ) {
    return res
      .status(400)
      .json({ error: "Please enter a valid transcript with more context." });
  }

  try {
    const prompt = `
You are a clinical assistant. Extract structured medical data from the following doctor-patient transcript.

If the input does not contain a coherent or medically relevant conversation, return:
{
  "error": "Unprocessable or irrelevant transcript"
}

Transcript:
"""${transcript}"""

Return a JSON object with:
- age
- gender
- diagnosis
- location
    `.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const responseText =
      completion.choices?.[0]?.message?.content?.trim() || "{}";

    let structured;
    try {
      structured = JSON.parse(responseText);
    } catch (jsonError) {
      console.warn("⚠️ Failed to parse OpenAI response as JSON:", responseText);
      return res
        .status(400)
        .json({ error: "Invalid JSON returned from language model." });
    }

    if (
      structured?.error ||
      !structured.diagnosis ||
      typeof structured.diagnosis !== "string"
    ) {
      return res.status(400).json({
        error:
          structured?.error || "Unable to extract diagnosis from transcript.",
      });
    }

    const trialsRes = await axios.get(
      "https://clinicaltrials.gov/api/v2/studies",
      {
        params: {
          "query.term": structured.diagnosis,
          pageSize: 10,
        },
      }
    );

    const trials = trialsRes.data?.studies || [];
    res.json({ patient: structured, trials });
  } catch (err) {
    res.status(500).json({ error: "Failed to process transcript." });
  }
});

export default router;
