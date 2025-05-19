import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { indexes } from '@/data/constants'

const AttemptSummary = ({questions,answers} : {questions : any[] , answers : (number | string[] | null)[]}) => {
  return (
    <div className='flex flex-col gap-2 max-w-[1000px]'>
      {
        questions.map((question,index) => {
            const questionType = question.type
            
            if (questionType === "Multiple Choice") { 
                return <MCQSummary key={index} index={index} question={question.question} options={question.options} input={answers[index] as number | null}  answer={question.answer}  />
            } else { 

            }
            return <OpenEndedSummary key={index} index={index} question={question.question} inputs={answers[index] as string[]}  answers={question.answers}/>
        })
      }
    </div>
  )
}

export default AttemptSummary


const MCQSummary = ({index,question,options,input,answer} : {index : number,question : string,options : string[],input : number | null , answer : number}) => {
  
    
    return <Card >
      <CardHeader>
            <CardTitle>
                Q{index +1}. 
            </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <div className='text-lg '>{question}</div>
          {
            input === null && <div className='text-muted-foreground'>
            You didnt pick an answer
          </div>
          }
          

          <div className='flex flex-col gap-2'>
            {
              options.map((option,optionIndex) => {

                if (input === optionIndex) { 
                    return <div key={option} className={cn('text-lg w-full px-3 py-2 rounded-lg flex', optionIndex === answer ? "bg-green-300" : "bg-red-300")} ><span className='pr-2'>{indexes[optionIndex]}.</span> {option}</div>
                }
              return <div key={option} className={cn('text-lg w-full px-3 py-2 rounded-lg flex', optionIndex === answer && "bg-green-300")} ><span className='pr-2'>{indexes[optionIndex]}.</span> {option}</div>
            })
            }
          </div>
          
        </CardContent>
        
    </Card>
}


const OpenEndedSummary = ({index,question,inputs,answers} : {index : number,question : string,inputs : string[] , answers : string[]}) => { 

    const sentences = question.split("_")
    const isCorrect = inputs[0].trim().toLowerCase() === answers[0].trim().toLowerCase() && inputs[1].trim().toLowerCase() === answers[1].trim().toLowerCase()
   
    return <Card className={cn(isCorrect ? "bg-green-100" : "bg-red-100")}>
        <CardHeader>
            <CardTitle>
                Q{index +1}. 
            </CardTitle>
        </CardHeader>
        <CardContent>
                {sentences[0]} 
                <Input className='w-fit inline' readOnly disabled={false} value={inputs[0] ?? ""}/>
                {inputs[0].trim().toLowerCase() === answers[0].trim().toLowerCase() ? 
                <Check  className='inline p-1 bg-green-400 rounded-full mx-2'/>
                : 
                <span className='px-2'><X  className='inline bg-red-400 rounded-full p-1 mr-2 '/>{`( ${answers[0]} )`}</span>} 
                {sentences[1]} 
                <Input className='w-fit inline' readOnly disabled={false} value={inputs[1] ?? ""}/> 
                {inputs[1].trim().toLowerCase() === answers[1].trim().toLowerCase() ? 
                <Check  className='inline p-1 mx-2 bg-green-400 rounded-full'/>
                : 
                <span className='px-2'><X  className='inline bg-red-400 rounded-full p-1  mr-2'/>{`( ${answers[1]} )`}</span>}
                {sentences[2]}
        </CardContent>
        
    </Card>
}
