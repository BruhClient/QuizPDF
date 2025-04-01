
import { DefaultSession } from "next-auth"


type UserRole = typeof User['role'];
export type  ExtendedUser = DefaultSession["user"] & { 
    role : UserRole, 
    id : string,
    username : string,
    image : string, 
    isOauth : boolean
    
}

declare module "next-auth" { 
    interface Session {
        user : ExtendedUser
    }
}