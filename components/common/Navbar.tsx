"use client"

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import useSessionUser from '@/hooks/use-session-user'
import UserProfile from '../auth/UserProfile'

const Navbar = () => {
    const user = useSessionUser()
  return (
    <nav className='w-full flex justify-between px-6 py-4 items-center'>
        <div className='text-2xl flex items-center'>
            Quiz<span className='text-primary'>PDF</span>
        </div>

        {
            user ? <UserProfile />:<div className='flex gap-2'>
            <Button variant={"ghost"} asChild><Link href={"signin"}>Login</Link></Button>
            <Button asChild><Link href={"signup"}>Sign up</Link></Button>
        </div>
        }
        
       
    </nav>
  )
}

export default Navbar
