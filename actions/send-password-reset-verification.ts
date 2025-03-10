"use server"

import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/password-reset-token"

export const sendPasswordResetVerification = async (email : string) => { 
    try { 
        const formattedEmail = email.toLowerCase()
        const passwordResetToken = await generatePasswordResetToken(formattedEmail)
        await sendPasswordResetEmail(passwordResetToken.email,passwordResetToken.code)
        
        return { 
            success : "6 Digit code sent !"
        }
    } catch(error) { 
        return { 
            error : "Something went wrong"
        }
    }
}