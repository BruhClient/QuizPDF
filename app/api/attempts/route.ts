// app/api/projects/route.ts
import { NextRequest } from "next/server"

import { db } from "@/db"
import { eq, and, desc } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { attempt } from "@/db/schema"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  
  const take = parseInt(searchParams.get("take") ?? "10")
  const page = parseInt(searchParams.get("page") ?? "0")
  const quizId = searchParams.get("quizId") ?? ""

  const session = await auth()
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

   try { 
              const attempts = await db.query.attempt.findMany({ 
                  where : and(eq(attempt.userId,session.user.id),eq(attempt.quizId,quizId) ), 
                  offset : page * take , 
                  orderBy : desc(attempt.createdAt),
                  limit : take , 
              })
  
  
              return Response.json(attempts)
    } catch(error) { 
            
        return new Response("Something went wrong", { status: 401 })
    }

    

    
} 
