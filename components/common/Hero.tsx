
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className='w-full flex h-[90vh] lg:h-[40vh] items-center justify-center  pt-4'>
        <div className='flex flex-col items-center gap-4'>          
          <div className='font-bold text-4xl max-w-[600px] text-center'>
            AI-Generated Quizzes from Your Content, <span className='text-primary'>Instantly.</span>
          </div>
          <div className='text-lg  max-w-[500px] text-center text-muted-foreground`'>
            Upload. Prompt. Quiz. Learn Smarter.
          </div>
          <div className='flex gap-2'>
            <Button asChild><Link href={"/signup"}>Try for Free</Link></Button>
            <Button variant={"outline"}>Learn more</Button>
          </div>
        </div>
    </section>
  )
}

export default Hero
