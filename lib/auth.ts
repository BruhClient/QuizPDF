import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import authConfig from "./auth-config"
import { getUserById } from "./users"
import {nanoid} from "nanoid"
import { UserRole } from "@prisma/client"




export const { handlers : {GET , POST}, auth, signIn, signOut } = NextAuth({
  pages : {
       
    signIn :"/signin"
  }, 
  events :  {
    async linkAccount ({user}) { 
      await prisma.user.update({ 
          where : { 
              id : user.id
          } , 
          data : { 
              emailVerified : new Date(), 

          }
      })
    } ,
    signIn : async ({account,user}) => {
      
      if (account?.type !== "credentials") { 
        await prisma.user.update({ 
          where : { 
            id : user.id
          }, 
          data : { 
            emailVerified : new Date(), 
            isOauth : true, 
            
          }
        })
      }
    }
  },
  adapter: PrismaAdapter(prisma),
  callbacks : {
    async signIn({user,account}) { 
      if (account?.provider !== "credentials") return true 
      const existingUser = await getUserById(user.id!)
      if (!existingUser?.emailVerified) { 
          return false
      }
      return true 
    }, 

    async session ({session,token}) { 
     

      if (token) { 
          session.user.image = token.image as string 
          session.user.id = token.id as string 
          session.user.isOauth = token.isOauth as boolean
          session.user.role = token.role as UserRole
          session.user.username = token.username as string 

      }
      return session
    },
    
    async jwt ({token}) { 

      
      const userExists = await getUserById(token.sub ?? token.id as string)
      if (!userExists) return token

      if (!userExists.username) { 
        await prisma.user.update({ 
            where : { 
                id : userExists.id
            }, 
            data : { 
                username : nanoid(9) 
            }
        })
      }
      const user = await getUserById(token.sub ?? token.id as string)


      return {
        id : user?.id , 
        username : user?.username, 
        isOauth : user?.isOauth, 
        image : user?.image, 
        email : user?.email, 
        role : user?.role

      }
    }
  },
  session : {strategy : "jwt"}, 
  ...authConfig,
})