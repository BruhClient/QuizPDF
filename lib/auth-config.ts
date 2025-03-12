import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "@/schema/signin";
import { getUserByEmail } from "../server/db/users";
import bcrypt from "bcryptjs";
import { env } from "@/data/env/server";
export default { 
    providers : [
        GoogleProvider({ 
            clientId : env.AUTH_GOOGLE_ID , 
            clientSecret : env.AUTH_GOOGLE_SECRET, 
        }), 
        GithubProvider({ 
            clientId : env.AUTH_GITHUB_ID , 
            clientSecret : env.AUTH_GITHUB_SECRET, 
        }), 
        Credentials({
            async authorize(credentials) { 
                
              
                const validatedFields = SignInSchema.safeParse(credentials)

                if (validatedFields.success) { 
                    const {email,password} = validatedFields.data
                    const formattedEmail = email.toLowerCase()
                    const user = await getUserByEmail(formattedEmail) 
                    if (!user || !user.hashedPassword ) return null
                    const passwordMatch = await bcrypt.compare(password , user.hashedPassword)
                    if (passwordMatch ) return user 
    
                    
    
    
                }
                return null
            }
        }),
        

    ], 

} satisfies NextAuthConfig