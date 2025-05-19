import { DEFAULT_FETCH_LIMIT } from '@/data/constants'
import { db } from '@/db'
import { quiz } from '@/db/schema'
import { auth } from '@/lib/auth'
import {  desc, eq } from 'drizzle-orm'
import React from 'react'
import QuizGrid from './QuizGrid'

const QuizWrapper = async () => {

    const session = await auth()

    const initialQuizes = await db.query.quiz.findMany({ 
        where : eq(quiz.userId,session!.user.id), 
                         
                          orderBy : desc(quiz.createdAt),
                          limit : DEFAULT_FETCH_LIMIT , 
    })


  if (!session) return null
  return (
    
      <QuizGrid initialQuizzes={initialQuizes} userId={session.user.id}/>
   
    
  )
}

export default QuizWrapper
