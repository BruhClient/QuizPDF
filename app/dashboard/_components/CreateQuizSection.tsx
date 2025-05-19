import CreatePDFQuizForm from "@/components/forms/CreatePDFQuizForm";
import CreateQuizForm from "@/components/forms/CreateQuizForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { File, Layers, Rewind } from "lucide-react";
import { Suspense } from "react";
import RecentActivity from "./RecentActivity";

const CreateQuizSection = () => {

    
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
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
                                    <CreateQuizForm />
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
                                    <CreatePDFQuizForm />
                                </CardContent>
                            </Card>
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
