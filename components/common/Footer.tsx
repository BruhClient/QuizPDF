
import React from 'react'
import { Button } from '../ui/button'
import { Facebook, Github, Instagram } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'


const Footer = () => {
  return (
    <div className='w-full py-12 flex justify-center items-center'>
      <div className=' w-full flex justify-between items-center px-8 max-w-[1200px]'>
        <div className='text-sm'>
          ThinkTest@2025
        </div>
        <div className='flex gap-2'>
                  <Button size={"icon"} variant={"ghost"} ><Facebook /></Button>
                  <Button size={"icon"} variant={"ghost"}><SiWhatsapp /></Button>
                  <Button size={"icon"} variant={"ghost"}><Github /></Button>
                  <Button size={"icon"} variant={"ghost"}><Instagram /></Button>
        </div>
      </div>
      
    </div>
  )
}

export default Footer 
