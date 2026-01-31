import { NextRequest, NextResponse } from "next/server";
import { generateText, Output } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const word1 = request.nextUrl.searchParams.get("word1") || "";
  const word2 = request.nextUrl.searchParams.get("word2") || "";

  const groq = await createGroq({
    apiKey: process.env.API_KEY,
  });

  const result = await generateText({
    model: groq("openai/gpt-oss-120b"),
    output: Output.object({
      schema: z.object({
        word: z.string(),
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
        { "word": string, "emoji": string }

      Combination rules:
      - Treat combinations as commutative (word1 + word2 == word2 + word1)
      - The result word must be a single word (no spaces)
      - The result word must be in the same language as the input words
      - If the two words are identical, return an intensified or derived form
      - If no meaningful combination exists, return:
        { "word": "unknown", "emoji": "❓" }

      Examples (authoritative):
      air + water → { "word": "rain", "emoji": "💧" }
      wind + sun → { "word": "breeze", "emoji": "🌬️" }
      fire + water → { "word": "steam", "emoji": "🌫️" }
      earth + water → { "word": "mud", "emoji": "🌊" }
      earth + fire → { "word": "lava", "emoji": "🌋" }
    `,
    prompt: `word1: ${word1}, word2: ${word2}`,
  });

  return NextResponse.json(result.output);
}
