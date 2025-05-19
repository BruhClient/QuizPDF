"use server"

import { auth } from "@/lib/auth";

import { extractFileKey } from "@/lib/utils";
import { updateUserByEmail } from "@/server/db/users";
import { UTApi } from "uploadthing/server";


export async function changeProfilePic(imageUrl : string) { 
    const session = await auth()

    const utapi = new UTApi()
    if (!session) { 
        return { 
            error : "Unauthorized"
        }
    }

    try { 
        if (session.user.image) {
            const prevFileKey = extractFileKey(session.user.image)
            if (prevFileKey) { 
                await utapi.deleteFiles([prevFileKey]);
            }
        } 
        

        
        
    
    
    
    
    
        updateUserByEmail(session.user.email!,{
            image : imageUrl,
        })
    
    
    
        return { 
            success : "Profile image uploaded successfully"
        }
    } catch(error) { 
        console.log(error)
        return { 
            error : "Something went wrong"
        }
    }


    
}