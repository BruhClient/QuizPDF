// app/api/projects/route.ts
import { NextRequest } from "next/server"

import { db } from "@/db"
import { eq, desc } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { quiz } from "@/db/schema"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  
  const take = parseInt(searchParams.get("take") ?? "10")
  const page = parseInt(searchParams.get("page") ?? "0")

  const session = await auth()
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

   try { 
              const quizzes = await db.query.quiz.findMany({ 
                  where : eq(quiz.userId,session.user.id), 
                  offset : page * take , 
                  orderBy : desc(quiz.createdAt),
                  limit : take , 
              })
  
  
              return Response.json(quizzes)
    } catch(error) { 
            
        return new Response("Something went wrong", { status: 401 })
    }

    

    
} 
