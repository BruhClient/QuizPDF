"use server"
import { SignUpSchema,SignUpPayload } from "@/schema/signup"
import { z } from "zod"
import bcryptjs from "bcryptjs"
import { generateVerificationToken } from "@/server/db/auth/verification-token" 
import { sendVerificationEmail } from "@/server/db/auth/mail"
import { createUser, getUserByEmail, getUserByUsername } from "@/server/db/users"
 

export const createAccount = async (values : SignUpPayload) => { 

    try { 
        const {username,password,email} = SignUpSchema.parse(values)
        const formattedEmail = email.toLowerCase()

        const formattedUsername = username.trim()
        const accountExists = await getUserByEmail(formattedEmail)

        if (accountExists) { 

            if (!accountExists.emailVerified) { 

                return { 
                    success : `Account created but email not verified . Please check your inbox folder ( ${email} )`
                }
            }

            return { 
                error : "Account already exists"
            }
        }

        const usernameExists = await getUserByUsername(formattedUsername)

        if (usernameExists) { 
            return { 
                error : "Username already exists"
            }
        }
        

        const hashedPassword = await bcryptjs.hash(password,4)


        
        await createUser(formattedEmail,{
            hashedPassword , 
            username
        })

        const verifcationToken = await generateVerificationToken(formattedEmail)

        await sendVerificationEmail(verifcationToken.email,verifcationToken.token)

        return { 
            success : `Verification email sent to ${verifcationToken.email}`
        }

    } catch(error) { 
        if (error instanceof z.ZodError) { 
            return {
                error : "Payload format invalid"
            }
        }
        return {
            error : "Something went wrong"
        }
    }
}