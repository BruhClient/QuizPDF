import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "@/schema/signin";
import { getUserByEmail } from "./users";
import bcrypt from "bcryptjs";
export default { 
    providers : [
        GoogleProvider({ 
            clientId : process.env.AUTH_GOOGLE_ID! , 
            clientSecret : process.env.AUTH_GOOGLE_SECRET!, 
        }), 
        GithubProvider({ 
            clientId : process.env.AUTH_GITHUB_ID! , 
            clientSecret : process.env.AUTH_GITHUB_SECRET!, 
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