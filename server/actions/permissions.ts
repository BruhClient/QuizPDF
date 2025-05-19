"use server"

import { pricingTypes } from "@/data/pricing"
import { auth } from "@/lib/auth"


export const Permissions = async (fileSize? : number  ) => { 
    const session = await auth()
    
    if (!session) { 
        return { 
            error : "Not logged in"
        }
    }

    const plan = pricingTypes.find((type) => type.name === session.user.plan)!

    if (fileSize) { 
        const maxFileSize = plan.fileSize

        if (fileSize > maxFileSize) { 
            return { 
            error : "File Size is too big"
        }
        }
    }

    if (plan.name === "Free"){ 
        const maxQuizes = plan.numOfQuizzes as number
        if (session.user.quizCreated >= maxQuizes) { 
            return { 
            error : "You have exceeded your free tier usage ."
        }
        }
    }
    return { 
        success : true
    }
}