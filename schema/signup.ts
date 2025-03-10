import {z} from "zod"

export const SignUpSchema = z.object({
    email : z.string().email() ,  
    username : z.string().min(1,{message : "Username is required."}).max(30,{message : "Username cannot exceed 30 characters."}),
    password : z.string().min(5,{message : "Password must be at least 5 characters"}), 
    confirmPassword : z.string(), 

}).refine((data) => {

    if (data.password !== data.confirmPassword) { 
        
        return false 
    }
    
    return true
},{
    message : 'Passwords do not match' , 
    path : ["confirmPassword"]
})

export type SignUpPayload = z.infer<typeof SignUpSchema>