

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {  Rewind } from "lucide-react";
import { Suspense } from "react";
import RecentActivity from "./RecentActivity";
import QuizPromptSection from "./QuizPromptSection";

const CreateQuizSection = () => {

    
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
                <QuizPromptSection />
                            <Card>
                                <CardHeader>
                                
                                        
                                    
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary p-3 rounded-full">
                                            <Rewind size={20} className="text-primary-foreground"/>
                                        </div>
                                        
                                        <div className="flex flex-col gap-1">
                                            <CardTitle>
                                                Recent Activity
                                            </CardTitle>
                                            <CardDescription>
                                                last 5 days
                                            </CardDescription>
                                        </div>
                                        
                                    </div>
                                    
                                </CardHeader>
                                <CardContent>
                                    <Suspense fallback="loading...">
                                        <RecentActivity />
                                    </Suspense>
                                </CardContent>
                            </Card>
    </div>
  )
}

export default CreateQuizSection
