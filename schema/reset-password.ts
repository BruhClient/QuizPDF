import {z} from "zod"

export const ResetPasswordSchema = z.object({ 
    email : z.string().email(),
    code : z.string().min(6).max(6), 
    
    

})

export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>

export const PasswordSchema = z.object({
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

export type PasswordPayload = z.infer<typeof PasswordSchema>