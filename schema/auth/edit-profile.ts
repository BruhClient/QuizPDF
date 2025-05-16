import {z} from "zod"

export const EditProfileSchema = z.object({ 
    email : z.string().email(),
    name : z.string().min(1,{message : "Name is required."}).max(30,{message : "name cannot exceed 30 characters."}).trim(),

})

export type EditProfilePayload = z.infer<typeof EditProfileSchema>