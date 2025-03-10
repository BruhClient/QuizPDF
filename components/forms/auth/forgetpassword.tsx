import { ResetPasswordPayload, ResetPasswordSchema } from "@/schema/reset-password";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form ,FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import ChangePasswordForm from "./changepassword";
import { sendPasswordResetVerification } from "@/actions/send-password-reset-verification";
import { toast } from "sonner";
import { verifyPasswordResetCode } from "@/actions/verify-password-reset-code";
import { ClipLoader } from "react-spinners";

 
const ForgetPasswordForm = ({back} : {back : () => void}) => {

    const [isVerified,setIsVerified] = useState(false)
    const form = useForm<ResetPasswordPayload>({ 
            resolver : zodResolver(ResetPasswordSchema), 
            defaultValues : {
              
                email : "", 
                code : "", 

                
            }
        })
    const [hasEmail,setHasEmail] = useState(false)
    const [isPending,startTransition] = useTransition()
    const onSubmit = (values : ResetPasswordPayload) => {

        
        if (values.code.length < 6 && !hasEmail) { 
            
           startTransition(() => { 
            sendPasswordResetVerification(values.email).then((data) => { 
                if (data.error) return toast(data.error)

                setHasEmail(true)
            })
           })
            
        } 

        if (values.code.length === 6 && values.email !== "") { 

            // Handle checking of code with token
            startTransition(() => { 
                verifyPasswordResetCode(values.email,values.code).then((data) => { 
                    if (data.error) return toast(data.error)
                        
                    setIsVerified(true)
                })
               })
            
                
        }

        


        
    }

    if (isVerified) { 
        return <ChangePasswordForm email={form.getValues().email}/>
    }
    return ( 
    
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 px-5 w-full">

            
            {
                hasEmail ? (
                <>
                
                    <FormField
                        control={form.control}
                        name ="code"
                        render={({field}) => (
                            <FormItem className="flex justify-center items-center flex-col gap-4" >
                                <FormLabel>
                                    Please enter your 6 digit code
                                </FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} onChange={(newValue) => field.onChange(newValue)}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    
                                </FormControl>
                            

                               
                            </FormItem>

                            
                            
                        )}
                    />
                    <Button disabled={isPending}>Submit OTP</Button>

                    
                </>
                ) : ( 
            <>
                <FormField
                    control={form.control}
                    name ="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Recovery Email
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="jsmith@gmail.com" />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                        
                    )}
                />
                <Button onClick={() => onSubmit(form.getValues())} disabled={isPending}>{isPending ? <div className="flex gap-2 items-center"><ClipLoader size={15} /> Sending Verification Email... </div> : "Send Verfication Email"}</Button>
            </>
                )
            }
            
           
           
           
            
            <Button type="button" variant={"link"} onClick={() => back()}>Back to sign up</Button>
            
        </form>
    </Form> 
    
);
}
 
export default ForgetPasswordForm;