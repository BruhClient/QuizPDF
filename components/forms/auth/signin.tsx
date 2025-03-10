"use client"

import { SignInPayload, SignInSchema } from "@/schema/signin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OauthButtons from "@/components/auth/OauthButtons";
import Link from "next/link";
import { login } from "@/actions/login";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ForgetPasswordForm from "./forgetpassword";
function SignInForm() {


    const [isResettingPassword,setIsResettingPassword] = useState(false)
    const form = useForm<SignInPayload>({ 
        resolver : zodResolver(SignInSchema), 
        defaultValues : {
          
            email : "", 
            password : "", 
            
        }
    })
    const {update} = useSession()
    const [isPending,startTransition] = useTransition()
    const router = useRouter()
    const searchParams = useSearchParams()

    const error = searchParams.get("error")

    const onSubmit = (values : SignInPayload) => {

        startTransition(() => { 
            login(values).then((data)  => { 
                if (data.success) {
                    toast(data.success)
                    update()
                    router.back()
                    
                    
                }
                if (data.error) toast(data.error)
                
                
                        
                
                
                
                

            })
        })
        
    }

    if (isResettingPassword) { 
        return <ForgetPasswordForm />
    }
    return ( 
    
    
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 px-2 w-full">
            <FormField
                control={form.control}
                name ="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Email Address
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="jsmith@gmail.com" />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    
                )}
            />
            <FormField
                control={form.control}
                name ="password"
                render={({field}) => (
                    <FormItem >
                        <FormLabel>
                            Password
                        </FormLabel>
                        <FormControl>
                            <Input {...field} type="password" placeholder="*****" />
                            
                        </FormControl>
                        <div onClick={() => setIsResettingPassword(true)} className="text-sm font-semibold cursor-pointer">Forgot Password ?</div>

                        <FormMessage />
                    </FormItem>
                    
                )}
            />
            <Button className="w-full" disabled={isPending}>{ isPending ? "Signing in ...": "Sign in"}</Button>
            {error && <div className="text-center text-sm text-red-400">Account already exist</div>}
            <OauthButtons />
            

            <Button type="button" variant={"link"} asChild><Link href={"/signup"}>Don't have an account ? Sign up</Link></Button>
        </form>
    </Form>
    

);
}

export default SignInForm;