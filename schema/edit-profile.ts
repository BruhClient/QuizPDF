import {z} from "zod"

export const EditProfileSchema = z.object({ 
    email : z.string().email(),
    username : z.string().min(1,{message : "Username is required."}).max(30,{message : "Username cannot exceed 30 characters."}),

})

export type EditProfilePayload = z.infer<typeof EditProfileSchema>