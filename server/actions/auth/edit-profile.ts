"use server"

import { auth } from "@/lib/auth"
import { sendVerificationEmail } from "@/server/db/auth/mail"
import { getUserByEmail, getUserByUsername, updateUserByEmail } from "@/server/db/users"
import { generateVerificationToken } from "@/server/db/auth/verification-token"
import { EditProfilePayload, EditProfileSchema } from "@/schema/edit-profile"

export const editProfile = async (values : EditProfilePayload) => { 
    try { 
        const {email , username} = EditProfileSchema.parse(values)
        const formattedEmail = email.toLowerCase()
        const formattedUsername = username.trim()
        
        
        
        const session = await auth()


        if (!session) { 
            return { 
                error : "Unauthorized"
            }
        }

        if (session.user.username !== username) { 
            const usernameExists = await getUserByUsername(formattedUsername)
            if (usernameExists) { 
                return {
                    error : "Username already exist"
                }
            }

            await updateUserByEmail(formattedEmail,{ 
                username : formattedUsername
            })
        }

        if (session.user.email !== formattedEmail) { 
            const emailExists = await getUserByEmail(formattedEmail)

            if (emailExists) { 
                return {
                    error : "Email already in use"
                } 
            }

            const token = await  generateVerificationToken(formattedEmail,session.user.email!)

            await sendVerificationEmail(token.email,token.token)

            return { 
                success : `Verification Email sent to ${email}`
            }
        }
        
        



        
        
        return { 
            success : "Changed Successfully !"
        }
    } catch { 
        return { 
            error : "Something went wrong"
        }
    }
}