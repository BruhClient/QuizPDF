"use client"

import { QuizPayload, QuizSchema } from '@/schema/CreateQuiz'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Check, Layers } from 'lucide-react'
import { createQuiz } from '@/server/db/quiz'
import Dropzone from '../Dropzone'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { deleteFileFromUploadthing } from '@/server/actions/uploadthing'

const CreatePDFQuizForm = () => {

  const form = useForm<QuizPayload>({ 
    resolver : zodResolver(QuizSchema), 
    defaultValues : { 
     
      questionNum : 1, 
      quizType : "Practice", 
      questionType : "Multiple Choice", 
      difficulty : "Easy"

    }
  })

  const [pdfText,setPdfText] = useState("")
  const [fileName,setFileName] = useState("")
  useEffect(() => {
    form.setValue("prompt",pdfText)
  },[pdfText])
  
  const [isPending,startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => { 
    const previous_key = localStorage.getItem("pdfKey")
    
    if (previous_key) { 
          startTransition(() => {deleteFileFromUploadthing(previous_key)})
    }
  },[])
  const queryClient = useQueryClient()
  const onSubmit = (values : QuizPayload) => {
    startTransition(() => { 
      createQuiz(values).then((data) => {
        if (data.success) {         
          showSuccessToast(data.success)
          setPdfText("")
          setFileName("")
          form.reset()

          queryClient.invalidateQueries({queryKey : ["quizzes"]})

          router.push(`/attempt/${data.data}`)
        } else{ 
          showErrorToast(data.error)
        }
      })
    }) 
  }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {
              pdfText ? <>
              <div className='w-full min-h-[200px] bg-muted flex justify-center rounded-lg gap-4 items-center flex-col'>
                  
                  <div className='bg-green-300 p-2 rounded-full'><Check size={20}/></div>
                  <div className='text-center'>
                      {fileName}
                  </div> 

                  
              </div>
              <FormField
                control={form.control}
                name ="questionNum"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Number of Questions {`( < 100 )`}
                        </FormLabel>
                        <FormControl>
                            <Input type='number' defaultValue={field.value} {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
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
                                 <Tabs defaultValue={field.value}  {...field} onValueChange={(value) => field.onChange(value)} className="w-full " >
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
                                <Tabs defaultValue={field.value}  {...field} onValueChange={(value) => field.onChange(value)} className="w-full " >
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
                        <FormItem>
                            
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
       
            <Button className="w-full" disabled={isPending}>{isPending ? <div className="flex items-center gap-2"><ClipLoader size={15} /> Creating... </div> : <><Layers /> Create Quiz</>}</Button>
            </> : <>
              <Dropzone onPdfDrop={(text,name) => {
                      setPdfText(text) 
                      setFileName(name)
              }

                } />
            </>
            }
            
                

                
        </form>

    </Form>
  )
}

export default CreatePDFQuizForm
