"use server"

import { getPasswordResetTokenByEmail } from "@/lib/password-reset-token"
import { prisma } from "@/lib/prisma"



export const verifyPasswordResetCode = async (email :string,code : string) => { 
    try { 
        const formattedEmail = email.toLowerCase()
        const passwordResetToken = await  getPasswordResetTokenByEmail(formattedEmail)
        
        if (passwordResetToken?.code !== code) { 
            return {
                error : "Code incorrect !"
            }
        } 

        await prisma.passwordResetToken.delete({
            where : {
                id : passwordResetToken.id
            }
        })

        return { 
            success : "Code Verified"
        }
    } catch(error) { 
        return { 
            error : "Something went wrong"
        }
    }
}