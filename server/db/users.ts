import { User } from "@prisma/client"
import { prisma } from "../../lib/prisma"


type allowedUserKeys = Partial<Pick<User, keyof User>>


export const getUserById = async (id : string) => { 

    try { 
        const user = await prisma.user.findUnique({
            where : {
                id : id
            }
        })

        return user
    } catch { 
        return null
    }
    
}

export const getUserByEmail = async (email : string) => { 

    try { 
        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })

        return user
    } catch { 
        return null
    }
    
}
export const getUserByUsername = async (username : string) => { 

    try { 
        const user = await prisma.user.findUnique({
            where : {
                username
            }
        })

        return user
    } catch { 
        return null
    }
    
}

export const updateUserByEmail = async (email : string, options :  allowedUserKeys) => { 
    try { 
        const user = await prisma.user.update({
            where : {
                email
            },
            data : options, 
            
        })

        return user
    } catch { 
        return null
    }
}


export const createUser = async (email : string , username?: string ,  hashedPassword? : string) => { 
    try { 
        const user = await prisma.user.create({ 
            data : { 
                email , 
                username, 
                hashedPassword,

            }
        })

        return user
    } catch { 
        return null
    }
}

