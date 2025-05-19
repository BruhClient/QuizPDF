"use server";

import { BATCH_SIZE, SYSTEM_QUESTION_PROMPT } from "@/data/constants";
import { env } from "@/data/env/server";
import { QuizPayload } from "@/schema/CreateQuiz";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// Split text into chunks of up to maxLength characters (based on words)
function chunkText(text: string, maxLength: number): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const word of words) {
    if ((currentChunk + " " + word).trim().length > maxLength) {
      if (currentChunk.trim().length > 0) chunks.push(currentChunk.trim());
      currentChunk = word;
    } else {
      currentChunk += " " + word;
    }
  }

  if (currentChunk.trim().length > 0) chunks.push(currentChunk.trim());
  return chunks;
}

// Safe JSON parser fallback
function tryParseQuestions(raw: string): any[] {
  try {
    const json = JSON.parse(raw);
    if (Array.isArray(json.questions)) return json.questions;
  } catch {}

  // Try to extract embedded "questions" array
  const match = raw.match(/"questions"\s*:\s*(\[[\s\S]+?\])/);
  if (match) {
    try {
      const questions = JSON.parse(match[1]);
      if (Array.isArray(questions)) return questions;
    } catch(error) {

      console.log(error)
    }
  }

  // Final fallback: try to wrap in JSON if needed
  try {
    const wrapped = `{${raw.split(/^{|}$/).join("")}}`;
    const json = JSON.parse(wrapped);
    if (Array.isArray(json.questions)) return json.questions;
  } catch {}

  console.warn("Failed to parse questions from OpenAI response.");
  return [];
}

// Prompt variations to reduce repetition
const variationPrompts = [
  "Ask conceptual and analytical questions.",
  "Focus on definitions and key terms.",
  "Include real-world application-based questions.",
  "Use indirect or inferential questions.",
  "Include tricky distractors in the options.",
  "Ask questions that test understanding, not recall.",
];

export async function generateQuestionsFromOpenAi(options: QuizPayload,pdf = false ) {
  const { prompt, questionNum, questionType, difficulty } = options;

  try {
    const chunks = chunkText(prompt, 1000);
    const titleChunk = chunkText(prompt, 100)[0] || "General Topic";
    
    // 1. Generate quiz title
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

    const title = titleRes.choices[0].message.content?.trim() || "Untitled Quiz";

    // 2. Calculate number of batches
    const batchCount = Math.ceil(questionNum / BATCH_SIZE);
    

    // 3. Generate questions with varied prompts
    const responses = await Promise.all(
      Array.from({ length: batchCount }).map((_, i) => {
        const isLast = i === batchCount - 1;
        const remaining = questionNum - i * BATCH_SIZE;
        const numQuestions = isLast ? remaining : BATCH_SIZE;

   
        const chunk = chunks[i % chunks.length];

        const variant = variationPrompts[i % chunks.length]
        return openai.chat.completions.create({
          model: "gpt-4-turbo",
          messages: [
            { role: "system", content: SYSTEM_QUESTION_PROMPT },
            {
              role: "user",
              content: `Generate ${numQuestions} ${questionType} questions from the following educational text. Use difficulty level: "${difficulty}". ${variant} .Return only valid JSON.\n\n"${chunk}"`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });
      })
    );

    
    // 4. Parse and collect all questions
    const allQuestions: any[] = [];

    for (const res of responses) {
      const content = res.choices[0].message.content || "";
      const questions = tryParseQuestions(content);
      allQuestions.push(...questions);
    }

    if (questionNum !== allQuestions.length) { 
      if (pdf) { 
        return {
        error : "Cound not generate enough questions . Please choose a lower question amount or upload another PDF "
      };
      }
      return {
        error : "Cound not generate enough questions . Please be more desciptive with your prompts "
      };
    
    }

    
    return {
      title,
      questions: allQuestions.slice(0, questionNum), // Limit to exact number
    };
  } catch (error: any) {
    if (error?.status === 429) {
      return {
        error : "RATE_LIMIT_EXCEEDED"
      };
    }
    return {
        error : "Failed to train quiz . Please try again"
    };;
  }
}
