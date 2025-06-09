"use server";

import { SYSTEM_QUESTION_PROMPT } from "@/data/constants";
import { env } from "@/data/env/server";
import { QuizPayload } from "@/schema/CreateQuiz";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// Simple chunker: split into fixed-length chunks by words
function chunkText(text: string, maxWords: number): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(" "));
  }

  return chunks;
}

// Try to parse OpenAI's response as a list of questions
function tryParseQuestions(raw: string): any[] {
  try {
    const json = JSON.parse(raw);
    if (Array.isArray(json.questions)) return json.questions;
  } catch {}

  const match = raw.match(/"questions"\s*:\s*(\[[\s\S]+?\])/);
  if (match) {
    try {
      const questions = JSON.parse(match[1]);
      if (Array.isArray(questions)) return questions;
    } catch {}
  }

  try {
    const wrapped = `{${raw.split(/^{|}$/).join("")}}`;
    const json = JSON.parse(wrapped);
    if (Array.isArray(json.questions)) return json.questions;
  } catch {}

  console.warn("Failed to parse questions from OpenAI response.");
  return [];
}

// Main quiz generation function
export async function generateQuestionsFromOpenAi(options: QuizPayload) {
  const { prompt, questionNum, questionType, difficulty } = options;

  try {
    // === 1. Generate Quiz Title ===
    const titleChunk = prompt.slice(0, 300); // Keep it short for title generation
    const titleRes = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: `You're a quiz generator. Generate only a concise and relevant quiz title for the topic: "${titleChunk}". Respond with a single string and remove the quotation marks.`,
        },
        {
          role: "user",
          content: `Generate a title for a ${difficulty} quiz on: "${titleChunk}"`,
        },
      ],
      temperature: 0.7,
      max_tokens: 50,
    });

    const title =
      titleRes.choices[0].message.content?.trim() || "Untitled Quiz";

    // === 2. Chunk input text ===
    const chunks = chunkText(prompt, 300); // Split every ~300 words
    const variationPrompts = [
      "Ask conceptual and analytical questions.",
      "Focus on definitions and key terms.",
      "Include real-world application-based questions.",
      "Use indirect or inferential questions.",
      "Include tricky distractors in the options.",
      "Ask questions that test understanding, not recall.",
    ];

    // === 3. Generate Questions ===
    const responses = await Promise.all(
      chunks.map((chunk, index) => {
        const variation = variationPrompts[index % variationPrompts.length];
        return openai.chat.completions.create({
          model: "gpt-4-turbo",
          messages: [
            { role: "system", content: SYSTEM_QUESTION_PROMPT },
            {
              role: "user",
              content: `Generate ${questionNum} ${questionType} questions from the following text. Use difficulty level: "${difficulty}". ${variation} Return only valid JSON with a "questions" array.\n\n"${chunk}"`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });
      })
    );

    // === 4. Parse Questions ===
    const allQuestions: any[] = [];
    for (const res of responses) {
      const content = res.choices[0].message.content || "";
      const parsed = tryParseQuestions(content);
      allQuestions.push(...parsed);
    }

    if (allQuestions.length === 0) {
      return {
        error:
          "Could not generate any questions. Try a more descriptive prompt.",
      };
    }

    return {
      title,
      questions: allQuestions.slice(0, questionNum),
    };
  } catch (error: any) {
    if (error?.status === 429) {
      return { error: "RATE_LIMIT_EXCEEDED" };
    }
    return { error: "Failed to generate quiz. Please try again." };
  }
}
