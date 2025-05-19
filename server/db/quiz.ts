"use server"

import { auth } from "@/lib/auth"
import { QuizPayload } from "@/schema/CreateQuiz"
import { generateQuestionsFromOpenAi } from "../actions/openai"
import { db } from "@/db"
import { quiz, users } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { Permissions } from "../actions/permissions"

export const createQuiz = async (values : QuizPayload,fileSize?:number) => {
    const session = await auth()
    
    if (!session) { 
        return { 
            error : "You are not authorized"
        }
    }
    

    try { 


        const isAllowed = await Permissions(fileSize)

        if (isAllowed.error) { 
            return { 
                error : isAllowed.error
            }
        }
        
        const generatedQuiz = await generateQuestionsFromOpenAi(values, fileSize !== undefined)
        
        if (generatedQuiz.error != undefined) { 
            return { 
            error : generatedQuiz.error
        
            }

        }

       
        const {questions,title} = generatedQuiz

       

        const quiz_db = await db.insert(quiz).values({ 
            title, 
            questions , 
            questionNum : values.questionNum , 
            quizType : values.quizType, 
            userId : session.user.id, 
            

            
        }).returning()


        await db.update(users).set({
            quizCreated : session.user.quizCreated + 1
        }).where(eq(users.id,session.user.id))

        
        return { 
            success : "Quiz has been created",
            data : quiz_db[0].id
        }
    } catch(error : any) { 
        if (error.message) { 

            return { 
            error : error.message
        }
            
        }
        return { 
            error : "Something went wrong"
        }
    }
}

export const getQuiz = async (id : string,userId : string) => { 
    "use cache"
    


    try { 
            const selectedQuiz = await db.query.quiz.findFirst({ 
                where : and(eq(quiz.userId,userId), eq(quiz.id , id))
            })


            return selectedQuiz
        } catch(error) { 
          
            return null
    }
}

export const deleteQuiz = async (id : string) => { 
    
    


    try { 
            const data = await db.delete(quiz).where(eq(quiz.id,id)).returning()

            revalidatePath("/dashboard")
            revalidatePath(`/quiz/${id}`)
            return {
                success :true, 
                userId : data[0].userId
            }
        } catch(error) { 
          
            return null
    }
}


