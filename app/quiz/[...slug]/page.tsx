


import { auth } from '@/lib/auth'
import { getQuiz } from '@/server/db/quiz'
import { redirect } from 'next/navigation'
import React from 'react'
import {format} from "date-fns"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import AttemptWrapper from '../_component/AttemptWrapper'
import DeleteQuizButton from '@/components/DeleteQuizButton'

const QuizPage = async ({params} : {params : Promise<{slug : string}>}) => {
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
    <div className='px-6 space-y-5'>
        <div className='flex items-center w-full justify-between flex-wrap gap-2'>
            <div className='flex flex-col gap-1 lg:p-3'>
                <div className='text-3xl font-semibold'>
                    {quiz.title} 
                </div>
                <div className='text-muted-foreground'>
                    {quiz.questionNum} Qns • {format(quiz.createdAt,"dd MMM yyyy")}
                </div>
            </div>
            <div className='flex gap-1'>
                <Button variant={"outline"} asChild>
                    <Link href={`/dashboard`}><ChevronLeft/>Back to Dashboard</Link>
                </Button>
                <Button asChild>
                    <Link href={`/attempt/${id}`}>Start Quiz</Link>
                </Button>
                <DeleteQuizButton id={id}/>
            </div>
            
        </div>
        <AttemptWrapper quizId={id}/>
        
        
        
    </div>
  )
}

export default QuizPage
