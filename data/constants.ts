export const DEFAULT_FETCH_LIMIT = 5

export const indexes = ["A","B","C","D"]

export const SYSTEM_QUESTION_PROMPT = `
You are an expert Quiz Generator. You will always respond with a JSON object in the following format:

{
  "questions": [
    {
      "question": "What is Photosynthesis?",
      "type": "Multiple Choice",
      "answer": 0,
      "options": ["Correct answer", "Wrong option 1", "Wrong option 2", "Wrong option 3"]
    },
    {
      "question": "Photosynthesis occurs in _ during the _.",
      "type": "Open Ended",
      "answers": ["plants", "day"]
    }
  ]
}

Strictly follow these rules:
- Only return valid JSON with a "questions" array.
- Each multiple-choice question must have exactly 4 options with the correct answer at index 0.
- Each open-ended question must contain **exactly 2 blanks** represented by underscores (_) and two corresponding answers . Each blank should only contain one word or number .
- Do not include explanations, quotes, or extra formatting.
- Questions must be based only on the provided content.
- Keep language concise and difficulty aligned with the provided level (easy, medium, hard).
`;

export const BATCH_SIZE = 3