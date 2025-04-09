"use client"

import { Github } from "lucide-react";
import { Button } from "../ui/button";
import { SiGoogle } from "react-icons/si";
import { signIn } from "next-auth/react";
import { Separator } from "../ui/separator";

function OauthButtons() {

    const OauthLogin = async (provider : "google" | "github") => { 
        await signIn(provider,{
            callbackUrl : "/dashboard" , 

        })
    }
    return ( 
    <>
        <div className="h-8 flex justify-center items-center relative">

            
            <Separator/>
            <div className="absolute top-2 text-[13px] w-fit bg-background text-muted-foreground px-2">OR CONTINUE WITH</div>

        </div>
        <div className="flex w-full gap-2 flex-wrap ">
            
            <Button type="button" variant={"outline"} className="flex-1" onClick={() => OauthLogin("google")}><SiGoogle/>Sign in with Google</Button>
            <Button type="button" variant={"outline"} className="flex-1" onClick={() => OauthLogin("github")}><Github/>Sign in with Github</Button>
            
        
        </div>
    </>
     );
}

export default OauthButtons;