"use server"
import { prisma } from "@/lib/prisma"
import { SignUpSchema,SignUpPayload } from "@/schema/signup"
import { z } from "zod"
import bcryptjs from "bcryptjs"
import { generateVerificationToken } from "@/lib/verification-token" 
import { sendVerificationEmail } from "@/lib/mail"
import { getUserByEmail, getUserByUsername } from "@/lib/users"
 

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


        
        await prisma.user.create({ 
            data : { 
                email : formattedEmail, 
                hashedPassword : hashedPassword, 
                username : formattedUsername

            }
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