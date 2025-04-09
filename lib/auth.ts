import NextAuth from "next-auth"
import authConfig from "./auth-config"
import { getUserById, getUserByUsername, updateUserByEmail, updateUserById } from "../server/db/users"
import {nanoid} from "nanoid"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { accounts, userRoleEnum, users } from "@/db/schema"
import { db } from "@/db"



export const { handlers : {GET , POST}, auth, signIn, signOut } = NextAuth({
  pages : {
       
    signIn :"/signin"
  }, 
  events :  {
    async linkAccount ({user}) { 
    
      await updateUserByEmail(user.email!, { 
        emailVerified : new Date(), 
      })
    } ,
    signIn : async ({account,user}) => {
      
      if (account?.type !== "credentials") { 
      
        await updateUserByEmail(user.email!,{ 
          emailVerified : new Date(), 
          isOauth : true, 
          
        })
      }
    }
  },
  adapter: DrizzleAdapter(db, { 
    usersTable : users , 
    accountsTable : accounts, 
  }),
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
          session.user.role = token.role as typeof userRoleEnum
          session.user.username = token.username as string 

      }
      return session
    },
    
    async jwt ({token}) { 

      
      const userExists = await getUserById(token.sub ?? token.id as string)
      if (!userExists) return token

      if (!userExists.username) { 

        let username = nanoid(9)
        let usernameExists = await getUserByUsername(username)
        while (usernameExists) { 

          username = nanoid(9) 

          usernameExists = await getUserByUsername(username) 


        }


        await updateUserById(userExists.id,{ 
          username ,
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