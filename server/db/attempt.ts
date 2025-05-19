"use server"

import { db } from "@/db"
import { attempt } from "@/db/schema"
import { auth } from "@/lib/auth"

export const createAttempt = async (answers: (number | null | string[])[] , questions : {answer : number, answers: string[], type : "Multiple Choice" | "Open Ended"}[] ,id : string ) => {
    const session = await auth()

    if (!session) { 
        return { 
            error : "You are not authorized"
        }
    }

    try { 

        let correctAnswers = 0

        questions.forEach((question,index) => {
            if (question.type ==="Multiple Choice" ){ 
                if (answers[index] === question.answer) { 
                    correctAnswers += 1
                }
            } else { 
                const [answer1,answer2] = question.answers as string[]
                const [input1,input2] = answers[index] as string[]

                

                if (answer1.toLowerCase().trim() === input1.toLowerCase().trim() && answer2.toLowerCase().trim() === input2.toLowerCase().trim()) {
                       correctAnswers += 1     
                }

                

            }
            
        })

        
     
        const percentage = Math.round((correctAnswers / questions.length) * 100) 


       

        const attempt_db = await db.insert(attempt).values({ 
             quizId : id , 
             userId : session.user.id, 
             score : percentage , 
             answers , 

            
        }).returning()
        return { 
            success : "Attempt has been recorded",
            data : attempt_db[0].score
        }
    } catch(error) { 
        console.log(error)
        return { 
            error : "Something went wrong"
        }
    }
}