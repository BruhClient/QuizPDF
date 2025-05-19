import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/data/env/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sendPaymentConfirmation } from "@/server/db/auth/mail";


async function getRawBody(readable: ReadableStream<Uint8Array>): Promise<Buffer> {
    const reader = readable.getReader();
    const chunks: Uint8Array[] = [];
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
  
    return Buffer.concat(chunks);
  }
  

export async function POST(req : NextRequest) { 

    const endpointSecret = env.STRIPE_WEBHOOK_KEY;
    
    const signature = (await headers()).get("stripe-signature") as string

    if (!signature || !endpointSecret) {
        
        return NextResponse.json({ error: "Missing Stripe signature or secret" }, { status: 400 });
    }
    
    let event: Stripe.Event; 
    try { 

        

        const rawBody = await getRawBody(req.body!);

        

        event = stripe.webhooks.constructEvent(rawBody,signature,endpointSecret)
    } catch (error) { 
        console.log(error)
        return new NextResponse("invalid signature",{status : 400})
    }
    //@ts-ignore
    const data = event.data.object as any
    const eventType = event.type

    try { 
        switch (eventType) { 
            case "checkout.session.completed" : { 
            
             
                console.log(data)
                
                await db.update(users).set({ 
                    plan : "Pro"
                }).where(eq(users.id,data.metadata.user_id))

                await sendPaymentConfirmation(data.user_id,data.name)

            

                
               
                
                
            }
            
            
    }

        return new NextResponse("Success")
    } catch(error) { 

       console.log(error)
        return new NextResponse("Error",{status : 500})
    }
    
    
}