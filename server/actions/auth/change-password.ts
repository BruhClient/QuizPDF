"use server"

import { prisma } from "@/lib/prisma"
import bcryptjs from "bcryptjs"


export const changePassword = async (email : string,password : string) => { 
    try { 
        const formattedEmail = email.toLowerCase()
        
        const hashedPassword = await bcryptjs.hash(password,4)
        await prisma.user.update({ 
            where : { 
                email : formattedEmail
            }, 
            data : {
                hashedPassword
            }
        })
        
        return { 
            success : "Password Changed"
        }
    } catch(error) { 
        return { 
            error : "Something went wrong"
        }
    }
}