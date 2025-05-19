"use client"

import AttemptSummary from '@/components/AttemptSummary'
import {  Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { indexes } from '@/data/constants'
import { showErrorToast } from '@/lib/toast'
import { createAttempt } from '@/server/db/attempt'
import { ChevronLeft, ChevronRight, Eye, EyeClosed, RotateCcw, Undo } from 'lucide-react'
import Link from 'next/link'
import React, {  useEffect, useReducer, useState, useTransition } from 'react'
 




type Question = { 
    type : "Multiple Choice" | "Open Ended" , 
    answer : number , 
    question : string , 
    options : string[]
    answers : string[]
}

type QuizState = {
  currentQuestionIndex: number;
  answers: (number | null | string[])[];
  questions: Question[];
};

function createInitialState(questions: Question[]): QuizState {
   const answers = questions.map((question) => {
      if (question.type === "Multiple Choice") return null 
      return ["",""]
   })
  return {
    currentQuestionIndex: 0,
    answers: answers,
    questions,
  };
}

type QuizAction =
  | { type: "ANSWER"; payload: number | string[] }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "RESTART"; payload: Question[] };


// 4. Reducer function
function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "ANSWER": {
      const updatedAnswers = [...state.answers];
      updatedAnswers[state.currentQuestionIndex] = action.payload;
      return { ...state, answers: updatedAnswers };
    }
    case "NEXT":
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.questions.length - 1
        ),
      };
    case "PREV":
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case "RESTART":
      return createInitialState(action.payload);
    default:
      throw new Error("Unknown action");
  }
}

const Quiz = ({id,questions,questionNum , quizType , quizId } : {id : string,questions :any[],questionNum : number , quizType : string , quizId : string}) => {
    
    const [state,dispatch] = useReducer(quizReducer,createInitialState(questions))
    
    const currentQuestion = state.questions[state.currentQuestionIndex]
    
    const [selectedIndex,setSelectedIndex] = useState<null | number | string[]>(state.answers[state.currentQuestionIndex])
    const [completed,setCompleted] = useState<number | null>(null)

    const [isPending,startTransition] = useTransition()
    
   
  if (completed != null) {
    
    const correctQns =  Math.round((completed / 100) * questionNum)
    return <div className="px-2 flex flex-col max-w-[1000px] w-full gap-2 pb-7">
      <Card>
        <CardContent className='flex flex-col items-center justify-center gap-2 '>
         
          <CardTitle className='pb-2'>
            You got {correctQns} correct out of {questionNum} questions
          </CardTitle>
          <CardDescription>
            <span className='font-bold'>Result - {completed}%</span> {`(pass score is 50%)`}
          </CardDescription>
          <div className='flex gap-2' >
            <Button variant={"outline"} onClick={() =>{
              setCompleted(null)
              
              dispatch({type : "RESTART" ,payload : questions})

              if (questions[0].type === "Multiple Choice") { 
                  setSelectedIndex(null)
              } else { 
                  setSelectedIndex(["",""])
              }
              
            } }>
                
                <RotateCcw /> Retake Quiz
            </Button>
            <Button variant={"outline"} asChild>
                
                <Link href={`/quiz/${id}`}>Back to dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    <AttemptSummary answers={state.answers} questions={questions}/>
</div>

  }
  return (
    <div className='w-full flex-1  flex flex-col gap-3 justify-center items-center'>
        <div>
            Question {state.currentQuestionIndex + 1} out of {questionNum}
        </div>
        
        {
          currentQuestion.type === "Multiple Choice" ? <div className=' text-2xl text-center pb-3'>
            {currentQuestion.question}
        </div> : <OpenEnded currentQuestion={currentQuestion} dispatch={dispatch}  selectedIndex={selectedIndex as string[]}  quizType={quizType} answers={currentQuestion.answers }/>
        }
        <div className='flex flex-col gap-3 w-full items-center max-w-[500px]'>
            

            {
              currentQuestion.type === "Multiple Choice" && <MCQ currentQuestion={currentQuestion} dispatch={dispatch}  selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} quizType={quizType}/> 

            }
            
            
            {(state.currentQuestionIndex +1 >= questionNum) && (<>
                <Button variant={"outline"} size={"lg"} className='w-full' disabled={isPending} onClick={() => {
                    
                    
                       
                        startTransition(() => {
                            createAttempt(state.answers,state.questions,quizId).then((data) => {
                              
                                if (data.success) {
                                    setCompleted(data.data)
                                } else { 
                                  showErrorToast(data.error)
                                }
                            })
                        })
                    }  
                      }>End Quiz<ChevronRight /></Button>
                
            </>)}

                {
                    quizType === "Practice" && currentQuestion.type === "Multiple Choice" && selectedIndex != null && selectedIndex !== currentQuestion.answer && <Button  size={"lg"} className='w-full' onClick={() => setSelectedIndex(null)}>Try again <Undo /></Button>
                  
                }

            
              <div className='flex gap-1 w-full pb-4'>
                  <Button className='flex-1' variant={"outline"} disabled={state.currentQuestionIndex === 0 } onClick={() => {
                    setSelectedIndex(state.answers[state.currentQuestionIndex -1 ])
                    dispatch({type : "PREV"})
                  }}>
                    <ChevronLeft /> Previous
                  </Button>
                  <Button className='flex-1' variant={"outline"} disabled={state.currentQuestionIndex +1 >= questionNum } onClick={() => {
                    setSelectedIndex(state.answers[state.currentQuestionIndex + 1])
                    dispatch({type : "NEXT"})

                  }}>
                    Next <ChevronRight />
                    
                  </Button>
              </div>

              
            
            

        </div>
        
        
        
      
    </div>
  )
}

export default Quiz


const MCQ = ({currentQuestion ,selectedIndex,dispatch,quizType , setSelectedIndex} : {currentQuestion : Question , dispatch : (action : QuizAction) => void , selectedIndex : null | number | string[] , quizType : string , setSelectedIndex : (value : any) => void}) => { 
  return <>
    {currentQuestion.options.map((option,index) => { 
                if (selectedIndex != null) { 
                    if (quizType === "Practice") { 
                        if (index === currentQuestion.answer && index === selectedIndex) { 
                            return <div key={option} className='text-lg w-full px-3 py-2 rounded-lg flex cursor-pointer bg-green-300' ><span className='pr-2'>{indexes[index]}.</span> {option}</div>
                        } else if (index === selectedIndex) { 
                            return <div key={option} className='text-lg w-full px-3 py-2 rounded-lg flex cursor-pointer bg-red-300' ><span className='pr-2'>{indexes[index]}.</span> {option}</div>
                        }
                        return <div key={option} className='text-lg bg-muted w-full px-3 py-2 rounded-lg flex cursor-pointer '><span className='pr-2'>{indexes[index]}.</span> {option}</div>
                        
                    } else { 
                        if (index === selectedIndex) { 
                            return <div key={option} className='text-lg w-full px-3 py-2 rounded-lg flex cursor-pointer bg-primary text-background' ><span className='pr-2'>{indexes[index]}.</span> {option}</div>
                        }
                        
                    }
                }
                return <button key={option} className='text-lg bg-muted w-full px-3 py-2 rounded-lg flex cursor-pointer hover:bg-muted/70' onClick={() => {
                    setSelectedIndex(index)
                    dispatch({type : "ANSWER" , payload : index})
                }}><span className='pr-2'>{indexes[index]}.</span> {option}</button>
            })}
  
  </>
}

const OpenEnded = ({currentQuestion ,selectedIndex,dispatch,quizType,answers} : {currentQuestion : Question , dispatch : (action : QuizAction) => void , selectedIndex : string[] , quizType : string,answers : string[]}) => { 
  
  const sentences = currentQuestion.question.split("_")
  const [answer1,setAnswer1] = useState(selectedIndex[0])
  const [answer2, setAnswer2] = useState(selectedIndex[1])
  const [showAnswers, setShowAnswers] = useState(false) 

  useEffect(() => {
    setAnswer1(selectedIndex[0])
    setAnswer2(selectedIndex[1])
    setShowAnswers(false)
  },[selectedIndex])
  useEffect(() => { 
    dispatch({type : "ANSWER",payload : [answer1,answer2]})
  },[answer1,answer2])
  
  return <>
  <div className='text-lg lg:text-2xl text-center tracking-wider leading-12 max-w-[800px] '>
    {sentences[0]} <Input className='w-fit inline' value={answer1} onChange={(e) => {
        setAnswer1(e.target.value)
        
    }}/> {sentences[1]} <Input className='w-fit inline' value={answer2} onChange={(e) => { 

      setAnswer2(e.target.value)
      
    }}/>  {sentences[2]}
  </div>
    {
      quizType === "Practice" && <div className='flex flex-col  items-center gap-2'>
      <Button variant={"outline"} onClick={() => setShowAnswers((prev) => !prev)}>{!showAnswers ?  <><EyeClosed /> Reveal Answers </> : <><Eye /> Hide Answers</>}</Button>
      {
        showAnswers && <div>{answers[0]} , {answers[1]}</div>
      }
    </div>
    }
    
    
      
 
  
  </>
}