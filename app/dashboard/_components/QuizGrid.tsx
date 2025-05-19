"use client"

import DeleteQuizButton from '@/components/DeleteQuizButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { quiz } from '@/db/schema'
import { useQuizzes } from '@/hooks/use-quizes';
import { format } from 'date-fns';
import { InferModel } from 'drizzle-orm';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { AnimatePresence } from "motion/react"
import { MotionDiv } from '@/lib/motion';
import { childVariants } from '@/lib/variants';

type Quiz = InferModel<typeof quiz>; 
const QuizGrid = ({initialQuizzes,userId} : {initialQuizzes : Quiz[],userId : string}) => {

    const {quizzes,fetchNextPage,hasNextPage,isFetching} = useQuizzes({userId})


  return (
    <div className='flex w-full flex-col gap-3'>
     
        <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-3"
      
      
    >
      <AnimatePresence mode="popLayout">
        {[...initialQuizzes,...quizzes].map(({ id, title, createdAt, questionNum, quizType, questions }) => {
          const questionType = (questions as { type: "Multiple Choice" | "Open Ended" }[])[0].type;

          return (
            <MotionDiv
              key={id}
              variants={childVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              
      
            >
              <QuizCard
                title={title}
                createdAt={createdAt}
                questionNum={questionNum}
                quizType={quizType}
                id={id}
                questionType={questionType}
              />
            </MotionDiv>
          );
        })}
      </AnimatePresence>
    </div>

       
        {hasNextPage && !isFetching && <Button className='max-w-[500px] w-full self-center' variant={"ghost"} onClick={() => fetchNextPage()}><ChevronDown />Get more entries</Button> }
        {
            quizzes.length + initialQuizzes.length === 0 && <div className='text-muted-foreground self-center'>You have no quizzes</div>
        }
    </div>
    
  )
}

export default QuizGrid

const QuizCard = ({id,title,createdAt,questionNum,quizType,questionType} : {id : string,title : string,createdAt : Date,questionNum : number,quizType : string , questionType : string})  => { 
    return <Card>
        <CardHeader>
            <CardTitle className='flex justify-between'>
                
                <div>
                    {title}
                </div>
                <div>
                    {quizType}
                    
                </div>
            </CardTitle>
            <CardDescription>
                {questionNum} {questionType} Questions
            </CardDescription>
            <CardDescription>
                {format(createdAt,"MMM yyyy")}
            </CardDescription>
            
        </CardHeader>
        <CardContent className='flex gap-2 justify-end w-full'>
            
            <Button asChild><Link href={`/attempt/${id}`}>Start Test</Link></Button>
            <Button  asChild><Link href={`/quiz/${id}`}>View Attempts</Link></Button>
            <DeleteQuizButton id={id}/>
        </CardContent>
    </Card>
}
