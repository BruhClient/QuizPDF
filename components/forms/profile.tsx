

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form ,FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EditProfilePayload, EditProfileSchema } from "@/schema/edit-profile";
import { editProfile } from "@/actions/edit-profile";
import { useSession } from "next-auth/react";


 
const EditProfileForm = () => {
    const {update,data :session} = useSession()
    const form = useForm<EditProfilePayload>({ 
                resolver : zodResolver(EditProfileSchema), 
                defaultValues : {
                  
                    username : session?.user.username ?? '', 
                    email : session?.user.email ?? "", 
    
                    
                }
            })

    
    const [isPending,startTransition] = useTransition()
    
    
    const onSubmit = (values : EditProfilePayload) => { 

        startTransition(() => {
            editProfile(values).then((data) => { 
                if (data.error) toast(data.error)
                if (data.success) toast(data.success)
                update()

            })
        })

    }
    return ( <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name ="username"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="jsmith"/>
                                    
                                </FormControl>
                            

                               
                            </FormItem>

                            
                            
                        )}
                    />

                <FormField
                        control={form.control}
                        name ="email"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="jsmith@gmail.com"/>
                                    
                                </FormControl>
                            

                               
                            </FormItem>

                            
                            
                        )}
                    />

                <Button className="w-full" disabled={isPending}>Save Changes</Button>
        </form>

    </Form> );
}
 
export default EditProfileForm;