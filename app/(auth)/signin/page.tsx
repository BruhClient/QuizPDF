"use client"

import SignInForm from "@/components/forms/auth/signin";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";


function SignInPage() {
    return ( <div className="fixed top-0 flex w-full h-screen justify-center items-center flex-col">
        <div className="w-full max-w-[500px] px-3 flex justify-center items-center flex-col gap-4">
            <h1 className="text-2xl">Sign In</h1>
            <Suspense>
                <SignInForm/>
            </Suspense>
            
            
            
        </div>
        <Button variant={"link"} asChild><Link href={"/"}>Back to home page</Link></Button>
        
        
    </div> );
}

export default SignInPage;