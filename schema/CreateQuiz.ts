import { z } from "zod"

export const QuizSchema = z.object({ 
    prompt : z.string().min(1),
    questionNum : z.number().min(1).max(100), 
    questionType : z.enum(["Multiple Choice","Open Ended"]), 
    quizType : z.enum(["Practice","Test"]), 
    difficulty : z.enum(["Easy","Intermediate","Hard","Expert"]), 

    
    

})

export type QuizPayload = z.infer<typeof QuizSchema>