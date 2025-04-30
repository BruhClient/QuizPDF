"use server"
import {v4 as uuidv4} from "uuid"
import { verificationTokens } from "@/db/schema"
import { eq } from "drizzle-orm"
import { db } from "@/db"


export const getVerificationTokenByEmail = async(email:string) => { 
    try { 
        const verificationToken = await db.select().from(verificationTokens).where(eq(verificationTokens.email,email)).limit(1)

        return verificationToken[0]
    } catch  { 
        return null
    }
}


export const getVerificationTokenByToken = async(token:string) => { 

    
    try { 
        
        const verificationToken = await db.select().from(verificationTokens).where(eq(verificationTokens.token,token)).limit(1)
        
        

        return verificationToken[0]
    } catch  { 
        return null
    }
}



export const generateVerificationToken = async (email : string, emailReplaced?:string) =>  { 
    const token = uuidv4()

    const expires = new Date(new Date().getTime() + 3600 * 10000)
    const existingToken = await getVerificationTokenByEmail(email) 

    if (existingToken) { 
        await db.delete(verificationTokens).where(eq(verificationTokens.id,existingToken.id))
    }

    const verificationToken = await db.insert(verificationTokens).values({ 
        email , 
        token , 
        emailReplaced , 
        expiresAt : expires, 

    }).returning()

    return verificationToken[0]
    
}

export const deleteVerificationTokenById = async (id : string) => {
    try { 
        
        const verificationToken = await db.delete(verificationTokens).where(eq(verificationTokens.id,id)).returning()
        
        

        return verificationToken[0]
    } catch  { 
        return null
    }
}



