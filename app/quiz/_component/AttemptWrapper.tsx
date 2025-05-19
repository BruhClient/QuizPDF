import { DEFAULT_FETCH_LIMIT } from '@/data/constants'
import { db } from '@/db'
import { attempt } from '@/db/schema'
import { auth } from '@/lib/auth'
import { and, desc, eq } from 'drizzle-orm'
import React from 'react'
import AttemptGrid from './AttemptGrid'

const AttemptWrapper = async ({quizId} : {quizId : string}) => {

    const session = await auth()

    const initialAttempts = await db.query.attempt.findMany({ 
        where : and(eq(attempt.userId,session!.user.id), eq(attempt.quizId,quizId)), 
                         
                          orderBy : desc(attempt.createdAt),
                          limit : DEFAULT_FETCH_LIMIT , 
    })


  if (!session) return null
  return (

      <AttemptGrid quizId={quizId} initialAttempts={initialAttempts}/>
    
    
  )
}

export default AttemptWrapper
