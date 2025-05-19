import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { pricingTypes } from '@/data/pricing'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

const Pricing = () => {
  return (
    <div className='flex justify-center gap-5 w-full flex-col items-center'>

        <div className='flex flex-col items-center gap-2'>
            <div className='text-3xl font-bold text-serif'>
                Pricing
            </div>
            <div className='text-lg text-muted-foreground'>
                No subscriptions , no hidden cost. 
            </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 max-w-[1000px] gap-3 w-full '>
            <PricingCard pricingType='Free'/>
            <PricingCard pricingType='Pro'/>

        </div>
      
    </div>
  )
}

export default Pricing


const CustomCheck = () => <div className='bg-green-400 p-1 rounded-full '><Check className='text-black' size={15}/></div>
const CustomX = () => <div  className='bg-red-400 p-1 rounded-full '><X size={15} className='text-black'/></div>


const PricingCard = ({pricingType} : {pricingType : "Free" | "Pro"}) => {

    const pricing = pricingTypes.find((type) => type.name === pricingType)!

  return (
    <Card>
    
                                
                            <CardHeader>
                                <CardTitle className='text-2xl font-serif '>{pricing.name}</CardTitle>
                                <CardDescription>{pricing.description}</CardDescription>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-4'>
                                <div>
                                    {pricing.discounts && <span className='line-through text-muted-foreground text-start pr-2'>${pricing.discounts}</span>}
                                    
                                    <span className='text-4xl font-serif font-bold'>${pricing.price}</span>
                                </div>
                                <div className='text-center space-y-1'>
                                    <Button className='w-full' variant={"outline"} asChild>
                                        <Link href={"/signup"}>Get Started</Link>   
                                    </Button>
                                    <div className='text-sm text-muted-foreground'>
                                        No Subscriptions . Pay once , use everywhere !
                                    </div>
                                </div>
                                
    
                                <div className='flex flex-col gap-2 py-5 px-1'>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        <CustomCheck /> {pricing.numOfQuizzes} Quizzes
                                    </div>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        {pricing.support ? <CustomCheck /> : <CustomX />} 24/7 support
                                    </div>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        <CustomCheck/> {pricing.fileSize} MB File Upload
                                    </div>
                                    
                                    
                                    

                                    
                                </div>
                            </CardContent>
                        </Card>
  )
}