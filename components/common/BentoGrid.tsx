"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { OrbitingIcons } from '../OrbitingIcons'
import { BentoList } from './BentoList'
import { SiTiktok, SiYoutube } from 'react-icons/si'
import {motion} from "motion/react"


const BentoGrid = () => {
  return (
    <div className='flex justify-center w-full'>
      <div className='w-[1200px]  grid grid-cols-12 gap-2'>
        <MainBlock />
        <Feature1 />
       
      </div>
    </div>
  )
}

const MainBlock = () => { 
    return <div className='lg:col-span-8 col-span-12 flex flex-col h-full  gap-2'>
        <Card className='w-full flex-1 rounded-sm '>
            <CardHeader>
                <CardTitle className='text-lg'>
                    AI Powered Quizes at your fingertips
                </CardTitle>
                <CardDescription>
                    Upload PDFs or create your own prompts
                </CardDescription>
            </CardHeader>
            <CardContent>
                <OrbitingIcons />
            </CardContent>
            
        </Card>
        <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2 '>
            <motion.button whileHover={{rotate : -2}} className='cursor-pointer h-full rounded-sm flex justify-center items-center w-full bg-red-400 py-3'>
                
                    <SiYoutube size={30} color='white'/>
             
                
                
            </motion.button>
            <motion.button whileHover={{rotate : -2}} className='cursor-pointer h-full rounded-sm flex justify-center items-center w-full bg-black/80 py-3'>
                
                    <SiTiktok size={30} color='white' />
             
                
                
            </motion.button>
        </div>
    </div>
}


const Feature1 = () => { 
    return <Card className='lg:col-span-4 col-span-12 rounded-sm '>
         <CardHeader>
                <CardTitle className='text-lg'>
                    Realtime updates
                </CardTitle>
                <CardDescription>
                    Looks at past attempts and learn from your mistakes
                </CardDescription>
            </CardHeader>
        <CardContent className='h-[550px]'>
            <BentoList />
        </CardContent>
        
    </Card>
}





export default BentoGrid
