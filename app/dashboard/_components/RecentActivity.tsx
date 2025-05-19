import { db } from '@/db'
import { attempt, quiz } from '@/db/schema'
import { auth } from '@/lib/auth'
import { desc, eq } from 'drizzle-orm'
import React from 'react'
import RecentActivityList from './RecentActivityList'

const RecentActivity = async () => {

    
    const session = await auth()
    const latestAttempts = await db
        .select({
            id : attempt.id, 
            score: attempt.score,
            quizName: quiz.title,
            createdAt : attempt.createdAt, 
        })
        .from(attempt)
        .where(eq(attempt.userId,session!.user.id))
        .orderBy(desc(attempt.createdAt))
        .leftJoin(quiz, eq(attempt.quizId, quiz.id))
        .limit(5); // ← limits the result to 5 rows

    
  

  return (
    <RecentActivityList attempts={latestAttempts}/>
  )
}

export default RecentActivity
