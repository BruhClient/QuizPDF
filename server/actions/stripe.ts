'use server'

import Stripe from 'stripe'
import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { env } from '@/data/env/client'
import { auth } from '@/lib/auth'
import { pricingTypes } from '@/data/pricing'


export async function createCheckoutSession() {
    const userSession = await auth()

    if (!userSession) { 
        return {
            error : "Please log in to continue"
        }
    }
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email : userSession.user.email!,
    line_items: [
      {
        price: pricingTypes.find((plan) => plan.name === "Pro")!.priceId, 
        quantity: 1,
      },
    ],
    
    success_url: `${env.NEXT_PUBLIC_VERCEL_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_VERCEL_URL}/stripe/cancel`,
    
    metadata: {
        user_id: userSession.user.id,
        name : userSession.user.name,
     
    },
      
    
    
   
  })

  redirect(session.url!) // Redirect user to Stripe Checkout
}
