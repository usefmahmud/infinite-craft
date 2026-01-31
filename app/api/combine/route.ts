import { NextRequest, NextResponse } from "next/server";
import { generateText, Output } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";
import mongoose from "mongoose";
import { ElementModel } from "@/models/Element.model";

export async function GET(request: NextRequest) {
  let word1 = request.nextUrl.searchParams.get("word1") || "";
  let word2 = request.nextUrl.searchParams.get("word2") || "";

  [word1, word2] = [word1, word2].sort().map((w) => w.toLowerCase());

  await connectDB();

  const existingElement = await ElementModel.findOne({
    word1,
    word2,
  });

  if (existingElement) {
    return NextResponse.json({
      text: existingElement.resultText,
      emoji: existingElement.resultEmoji,
    });
  }

  const groq = await createGroq({
    apiKey: process.env.API_KEY,
  });

  const result = await generateText({
    model: groq("openai/gpt-oss-120b"),
    output: Output.object({
      schema: z.object({
        text: z.string(),
        emoji: z.string(),
      }),
    }),
    system: `
      You are a infinite craft expert and creative word combiner.

      Given two input words in the same language, generate ONE meaningful word that represents or relates to both inputs, and ONE emoji that best matches that result.

      Output rules (VERY IMPORTANT):
      - Return ONLY a valid JSON object
      - Do NOT include markdown, text, or explanations
      - Do NOT include extra fields
      - JSON format MUST be exactly:
        { "text": string, "emoji": string }

      Combination rules:
      - Treat combinations as commutative (word1 + word2 == word2 + word1)
      - The result word must be a single word (no spaces)
      - The result word must be in the same language as the input words
      - If the two words are identical, return an intensified or derived form
      - If no meaningful combination exists, return:
        { "text": "unknown", "emoji": "❓" }

      Examples (authoritative):
      air + water → { "text": "rain", "emoji": "💧" }
      wind + sun → { "text": "breeze", "emoji": "🌬️" }
      fire + water → { "text": "steam", "emoji": "🌫️" }
      earth + water → { "text": "mud", "emoji": "🌊" }
      earth + fire → { "text": "lava", "emoji": "🌋" }
    `,
    prompt: `word1: ${word1}, word2: ${word2}`,
  });

  const resultWord = result.output.text;
  const existingResult = await ElementModel.findOne({
    word1,
    word2,
    resultText: resultWord,
  });

  if (!existingResult) {
    const newElement = new ElementModel({
      word1,
      word2,
      resultText: result.output.text,
      resultEmoji: result.output.emoji,
    });
    await newElement.save();
  }

  return NextResponse.json(result.output);
}

const connectDB = async () => {
  if (!process.env.DATABASE_URI) {
    throw new Error("DATABASE_URI is not defined in environment variables");
  }

  await mongoose.connect(process.env.DATABASE_URI);
};
