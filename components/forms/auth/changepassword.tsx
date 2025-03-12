
import { PasswordPayload, PasswordSchema } from "@/schema/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form ,FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/server/actions/auth/change-password";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

interface ChangePasswordFormProps {
    email : string , 
}
 
const ChangePasswordForm: FunctionComponent<ChangePasswordFormProps> = ({email}) => {

    const form = useForm<PasswordPayload>({ 
                resolver : zodResolver(PasswordSchema), 
                defaultValues : {
                  
                    password : "", 
                    confirmPassword : "", 
    
                    
                }
            })
    const [isPending,startTransition] = useTransition()
    const router = useRouter()
    const onSubmit = (values : PasswordPayload) => { 

        startTransition(() => {
            changePassword(email,values.password).then((data) => { 
                if (data.error) return toast(data.error)

                toast(data.success) 

                router.back()
            })
        })

    }
    return ( <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                        control={form.control}
                        name ="password"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>
                                    New Password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="*****"/>
                                    
                                </FormControl>
                            

                               
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
                                    <Input {...field} type="password" placeholder="*****"/>
                                    
                                </FormControl>
                            

                               
                            </FormItem>

                            
                            
                        )}
                    />

                <Button className="w-full" disabled={isPending}>{isPending ? <div className="flex gap-2 items-center"><ClipLoader size={15}/> Changing Password </div> : "Change Password"}</Button>
        </form>

    </Form> );
}
 
export default ChangePasswordForm;