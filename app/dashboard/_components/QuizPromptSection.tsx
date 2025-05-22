"use client"

import React, { useTransition } from 'react'
import CreatePDFQuizForm from "@/components/forms/CreatePDFQuizForm";
import CreateQuizForm from "@/components/forms/CreateQuizForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { File, Layers } from "lucide-react";

const QuizPromptSection = () => {

  const [isPending,startTransition] = useTransition()
  if (isPending) { 
    return <>
    <Card className='w-full min-h-[400px]'>
        <CardContent className='flex justify-center items-center h-full'>
            Loading your quiz...
        </CardContent>
    </Card>
    <Card className='w-full min-h-[400px]'>
      <CardContent className='flex justify-center items-center h-full'>
          Loading your quiz...
      </CardContent>
    </Card>
    
    </>
  }
  return (
    <>
    <Card className="h-fit">
                                <CardHeader>
                                
                                        
                                    
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary p-3 rounded-full">
                                            <Layers size={20} className="text-primary-foreground"/>
                                        </div>
                                        
                                        <div className="flex flex-col gap-1">
                                            <CardTitle>
                                                Create Quiz
                                            </CardTitle>
                                            <CardDescription>
                                                Enter a prompt and we will generate the quiz for you !
                                            </CardDescription>
                                        </div>
                                        
                                    </div>
                                    
                                </CardHeader>
                                <CardContent >
                                    <CreateQuizForm startTransition={startTransition}/>
                                </CardContent>
                            </Card>

                            <Card className="h-fit ">
                                <CardHeader>
                                
                                        
                                    
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary p-3 rounded-full">
                                            <File size={20} className="text-primary-foreground"/>
                                        </div>
                                        
                                        <div className="flex flex-col gap-1">
                                            <CardTitle>
                                                PDF Quiz
                                            </CardTitle>
                                            <CardDescription>
                                                Put in your PDF . We'll handle the rest.
                                            </CardDescription>
                                        </div>
                                        
                                    </div>
                                    
                                </CardHeader>
                                <CardContent >
                                    <CreatePDFQuizForm startTransition={startTransition}/>
                                </CardContent>
                            </Card>
    
    
    </>
  )
}

export default QuizPromptSection
