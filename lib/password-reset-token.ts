
import { prisma } from "./prisma"
import crypto from "crypto"


export const getPasswordResetTokenByEmail = async(email:string) => { 
    try { 
        const verificationToken = await prisma.passwordResetToken.findFirst({
            where : {
                email
            }
        })

        return verificationToken
    } catch  { 
        return null
    }
}



export const generatePasswordResetToken = async (email : string) =>  { 
    const code = crypto.randomInt(100_000,1_000_000 ).toString()

    const expires = new Date(new Date().getTime() + 3600 * 10000)
    const existingToken = await getPasswordResetTokenByEmail(email) 

    if (existingToken) { 
        await prisma.passwordResetToken.delete({
            where :{ 
                id : existingToken.id
            }, 

        } )
    }

    const passwordResetToken = await prisma.passwordResetToken.create({ 
        data : { 
            email , 
            code , 
            expires
        }
    })

    return passwordResetToken
    
}



