"use client"

import { Button } from '@/components/ui/button';
import { attempt } from '@/db/schema'
import { useAttempts } from '@/hooks/use-attempts';
import { MotionDiv } from '@/lib/motion';
import { childVariants, containerVariants } from '@/lib/variants';
import { format } from 'date-fns';
import { InferModel } from 'drizzle-orm';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Attempt = InferModel<typeof attempt>; 
const AttemptGrid = ({initialAttempts,quizId} : {initialAttempts : Attempt[],quizId : string}) => {

    const {attempts,fetchNextPage,hasNextPage,isFetching} = useAttempts({quizId})
  return (
    <div className='flex w-full flex-col gap-3 items-center '>
        <MotionDiv className='flex-col flex max-w-[500px] w-full gap-3' variants={containerVariants} initial="initial" animate="animate">

            {
                [...initialAttempts,...attempts].map(({id,score,createdAt}) => {
            
                    return <MotionDiv  key={id} variants={childVariants}><AttemptCard id={id} score={score} createdAt={createdAt}/></MotionDiv> })
            }
        
        </MotionDiv>
        {hasNextPage && !isFetching && <Button className='max-w-[500px] w-full self-center' variant={"ghost"} onClick={() => fetchNextPage()}><ChevronDown />See more attempts</Button> }
        {
            attempts.length + initialAttempts.length === 0 && <div className='text-muted-foreground self-center'>You have no attempts</div>
        }
    </div>
    
  )
}

export default AttemptGrid

const AttemptCard = ({id,score , createdAt} : {id : string, score : number , createdAt : Date})  => { 
    
    return <Link href={`/attempt/summary/${id}`} className='bg-background w-full shadow-sm px-3 py-5 border-2 flex justify-between rounded-sm cursor-pointer hover:bg-primary/30'>
        <div>
            {format(createdAt,"MMM yyyy HH:mm")}
        </div>
        <div className='font-bold font-serif'>
            {score}%
        </div>
    </Link>
}
