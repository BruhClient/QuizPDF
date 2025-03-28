"use client"


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OauthButtons from "@/components/auth/OauthButtons";
import Link from "next/link";
import { SignUpPayload, SignUpSchema } from "@/schema/signup";
import { useTransition } from "react";
import { createAccount } from "@/server/actions/auth/create-account";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";


function SignUpForm() {
    const searchParams = useSearchParams()

    const error = searchParams.get("error")

    const form = useForm<SignUpPayload>({ 
        resolver : zodResolver(SignUpSchema), 
        defaultValues : {
          
            email : "",
            username : "", 
            password : "", 
            confirmPassword : ""
            
        }
    })

    const [isPending,startTransition] = useTransition()

    const onSubmit = (values : SignUpPayload) => {
        startTransition(() => { 
            createAccount(values).then((data) => { 
                if (data.error) return toast.error(data.error)
                if (data.success) {
                    toast.success(data.success)
                    form.reset()
                }

            })
        })
        
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
                name ="username"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Username
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="jsmith" />
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
                        

                        <FormMessage />
                    </FormItem>
                    
                )}
            />
            <FormField
                control={form.control}
                name ="confirmPassword"
                render={({field}) => (
                    <FormItem >
                        <FormLabel>
                            Confirm Password
                        </FormLabel>
                        <FormControl>
                            <Input {...field} type="password" placeholder="*****" />
                            
                        </FormControl>
                        

                        <FormMessage />
                    </FormItem>
                    
                )}
            />
            <Button className="w-full" disabled={isPending}>{isPending ? <div className="flex gap-2 items-center"><ClipLoader size={15} /> Signing up... </div> : "Sign up"}</Button>
            {error && <div className="text-center text-sm text-red-400">Account already exist</div>}
            <OauthButtons />
            

            <Button type="button" variant={"link"} asChild><Link href={"/signin"}>Have an account ? Sign in</Link></Button>
        </form>
    </Form>
    

);
}

export default SignUpForm;