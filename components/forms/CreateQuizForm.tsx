"use client"

import { QuizPayload, QuizSchema } from '@/schema/CreateQuiz'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Layers } from 'lucide-react'
import { createQuiz } from '@/server/db/quiz'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

const CreateQuizForm = ({startTransition} : {startTransition : React.TransitionStartFunction}) => {

  const form = useForm<QuizPayload>({ 
    resolver : zodResolver(QuizSchema), 
    defaultValues : { 
     
      questionNum : 1, 
      quizType : "Practice", 
      questionType : "Multiple Choice", 
      difficulty : "Easy",
      prompt : "",

    }
  })

  
  const router = useRouter()
  const queryClient = useQueryClient()
  const onSubmit = (values : QuizPayload) => {
    startTransition(async () => { 
      
      createQuiz(values).then((data) => {
        if (data.success) {
              showSuccessToast(data.success)
              queryClient.invalidateQueries({queryKey : ["quizzes"]})
              router.push(`/attempt/${data.data}`)
              form.reset()
            } else{ 
              showErrorToast(data.error)
            }
      })
    }) 
  }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full h-full">
                    <FormField
                control={form.control}
                name ="prompt"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Quiz Prompt
                        </FormLabel>
                        <FormControl>
                            <Textarea className='min-h-24 max-h-[300px] h-full' {...field} placeholder="What are you thinking today ?"/>
                        </FormControl>

                     
                    </FormItem>
                    
                )}
            />
            <FormField
                control={form.control}
                name ="questionNum"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Number of Questions {`( < 100 )`}
                        </FormLabel>
                        <FormControl>
                            <Input type='number' {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                        </FormControl>


                    </FormItem>
                    
                )}
            />
          
                <FormField
                    control={form.control}
                    name ="difficulty"
                    render={({field}) => (
                        <FormItem>
                            
                            <FormControl>
                                <Tabs defaultValue={field.value} {...field} onValueChange={(value) => field.onChange(value)} className="w-full " >
                                  <TabsList className='w-full'>
                                    <TabsTrigger value="Easy">Easy</TabsTrigger>
                                    <TabsTrigger value="Intermediate">Intermediate</TabsTrigger>
                                    <TabsTrigger value="Hard">Hard</TabsTrigger>
                                    <TabsTrigger value="Expert">Expert</TabsTrigger>
                                    
                                    
                                  </TabsList>
                                 
                                </Tabs>
                            </FormControl>

                      
                        </FormItem>
                        
                    )}
                />
                <FormField
                    control={form.control}
                    name ="quizType"
                    render={({field}) => (
                        <FormItem>
                            
                            <FormControl>
                                <Tabs defaultValue={field.value} {...field}  onValueChange={(value) => field.onChange(value)} className="w-full " >
                                  <TabsList className='w-full'>
                                    <TabsTrigger value="Practice">Practice</TabsTrigger>
                                    <TabsTrigger value="Test">Test</TabsTrigger>
                                  </TabsList>
                                 
                                </Tabs>
                            </FormControl>

                     
                        </FormItem>
                        
                    )}
                />
                <FormField
                    control={form.control}
                    name ="questionType"
                    render={({field}) => (
                        <FormItem className='w-full'>
                            
                            <FormControl>
                                <Tabs defaultValue={field.value} {...field} onValueChange={(value) => field.onChange(value)} className="w-full " >
                                  <TabsList className='w-full'>
                                    <TabsTrigger value="Multiple Choice">Multiple Choice</TabsTrigger>
                                    <TabsTrigger value="Open Ended">Open Ended</TabsTrigger>
                                  </TabsList>
                                 
                                </Tabs>
                            </FormControl>

                     
                        </FormItem>
                        
                    )}
                />
        
            <Button className="w-full"><Layers /> Create Quiz</Button>
                

                
        </form>

    </Form>
  )
}

export default CreateQuizForm
