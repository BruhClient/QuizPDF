"use client"


import { MotionDiv } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { childVariants, containerVariants } from '@/lib/variants'
import { format } from 'date-fns'
import React from 'react'


const RecentActivityList = ({attempts} : {attempts :{id : string , quizName : string | null , score : number , createdAt : Date}[]}) => {
  return (
    <MotionDiv variants={containerVariants} animate={"animate"} initial={"initial"} className='flex flex-col gap-3'>
          {
            attempts.map(({id,quizName,score,createdAt}) => <MotionDiv variants={childVariants}  className='flex justify-between bg-muted rounded-lg px-3 py-3' key={id}>
                <div>
                    <div>
                        {quizName}
                    </div>
                    <div className='text-muted-foreground text-sm'>
                        {format(createdAt,"dd-MM-yyyy")}
                    </div>
                    
                </div>
                <div className={cn('text-xl font-semibold font-serif', score >= 50 ? "text-green-400"  : "text-red-400")}>
                    {score}%
                </div>
            </MotionDiv>)
          }
    </MotionDiv>
  )
}

export default RecentActivityList
