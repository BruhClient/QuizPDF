
import { env } from "@/data/env/server"
import {Resend} from "resend"

const resend = new Resend(env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_VERCEL_URL

export const sendVerificationEmail = async ( email: string , token:string ) => { 
    
    const confirmLink = `${domain}/account-verification/${token}`

    await resend.emails.send({ 
        from : "mail@recursionerror.com", 
        to : email , 
        subject : "Confirm your email" , 
        html : `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`
    })

    
} 

export const sendPasswordResetEmail = async ( email: string , code:string ) => { 
    
    
    await resend.emails.send({ 
        from : "mail@recursionerror.com", 
        to : email , 
        subject : "Password Reset Code" , 
        html : `<p>Your Verification Code is ${code}</p>`
    })

    
} 
