import { auth } from '@/lib/auth'
import { getQuiz } from '@/server/db/quiz'
import { redirect } from 'next/navigation'
import React from 'react'
import Quiz from '../_components/Quiz'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const AttemptPage = async ({params} : {params : Promise<{slug : string}>}) => {
    const id = (await params).slug[0]
    const session = await auth()
    
        if (!session) { 
            redirect("/")
        }
        
        const quiz = await getQuiz(id,session.user.id) 
    
        if (!quiz) { 
            redirect("/dashboard")
        }


  return (
    <div className='flex h-[90vh] flex-col items-center w-full px-3'>
         <div className='flex flex-col gap-2 text-center justify-center items-center'>
                        <Badge variant="outline">{quiz.quizType}</Badge>
                        <div className='text-3xl font-semibold'>
                            {quiz.title} 
                        </div>
                        
                        <Button variant={"link"} asChild >
                            <Link href={`/quiz/${id}`}>Back to Quiz Dashboard</Link>
                            
                        </Button>
        </div>
        <Quiz id={id} questions={quiz.questions as any[]} questionNum={quiz.questionNum} quizType={quiz.quizType} quizId={quiz.id}/>
    </div>
  )
}

export default AttemptPage
