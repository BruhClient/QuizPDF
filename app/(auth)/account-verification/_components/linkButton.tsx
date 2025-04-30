"use client"
import { Button } from '@/components/ui/button'
import { sendVerificationEmail } from '@/server/db/auth/mail'
import { generateVerificationToken } from '@/server/db/auth/verification-token'
import React, { useState, useTransition } from 'react'

const LinkButton = ({email} : {email : string}) => {

    const [isSent,setIsSent] = useState(false)
    const [isPending,startTransition] = useTransition()



    if (isSent) { 
    return <div className='text-center'>
        Token Sent . Please check your inbox
    </div>
    }
    
  return (
    <Button disabled={isPending} onClick={() => { 
        startTransition(async () => { 
            const newToken = await generateVerificationToken(email)
            sendVerificationEmail(newToken.email,newToken.token)
            setIsSent(false)
        })
    }} className="w-full" variant="outline">Resend Verification Link</Button>
  )
}

export default LinkButton
