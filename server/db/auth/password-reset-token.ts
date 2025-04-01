
import { db, passwordTokens } from "@/db/schema"
import crypto from "crypto"
import { eq } from "drizzle-orm"


export const getPasswordResetTokenByEmail = async(email:string) => { 
    try { 
        const verificationToken = await db.select().from(passwordTokens).where(eq(passwordTokens.email,email)).limit(1);
        return verificationToken[0]
    } catch  { 
        return null
    }
}



export const generatePasswordResetToken = async (email : string) =>  { 
    const code = crypto.randomInt(100_000,1_000_000 ).toString()

    const expires = new Date(new Date().getTime() + 3600 * 10000)
    const existingToken = await getPasswordResetTokenByEmail(email) 

    if (existingToken) { 
        await db.delete(passwordTokens).where(eq(passwordTokens.id , existingToken.id))
    }

    const passwordResetToken = await db.insert(passwordTokens).values({ 
        code , 
        expiresAt : expires ,
        email , 


    }).returning()

    return passwordResetToken[0]
    
}



export const deletePasswordResetTokenById = async (id : string) => {
    try { 
        
        const verificationToken = await db.delete(passwordTokens).where(eq(passwordTokens.id,id)).returning()
        
        

        return verificationToken[0]
    } catch  { 
        return null
    }
}



