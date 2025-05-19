import React from 'react'
import { db } from '@/db'
import { attempt, quiz } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import AttemptSummary from '@/components/AttemptSummary'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const SummaryDisplay = async ({userId,id} : {userId : string , id : string}) => {
    
    const selectedAttempt = await db.query.attempt.findFirst({ 
        where : and(eq(attempt.id,id),eq(attempt.userId,userId)), 
    
    })

    if (!selectedAttempt) redirect("/dashboard")

    const selectedQuiz = await db.query.quiz.findFirst({ 
        where : and(eq(quiz.id,selectedAttempt.quizId),eq(quiz.userId,userId))
    })

    if (!selectedQuiz) redirect("/dashboard")

    const questions = selectedQuiz.questions as any[]
    const answers = selectedAttempt.answers as (number | string[] | null)[]

    const correctQns =  Math.round((selectedAttempt.score / 100) * selectedQuiz.questionNum)
  return (
    <>
    <Card className='w-full max-w-[1000px]'>
        <CardContent className='flex flex-col items-center justify-center gap-2 '>
          <CardTitle className='pb-2'>
            You got {correctQns} correct out of {selectedQuiz.questionNum} questions
          </CardTitle>
          <CardDescription>
            <span className='font-bold'>Result - {selectedAttempt.score}%</span> {`(pass score is 50%)`}
          </CardDescription>
          
          <div className='flex gap-3' >
            <Button variant={"outline"} asChild>
                
                <Link href={`/attempt/${selectedQuiz.id}`}>Retake Quiz</Link>
            </Button>
            <Button variant={"outline"} asChild>
                
                <Link href={`/quiz/${selectedQuiz.id}`}>Back to dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    <AttemptSummary questions={questions} answers={answers}/>
    </>
    
  )
}

export default SummaryDisplay
