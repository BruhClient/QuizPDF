import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/users";
import { generateVerificationToken } from "@/lib/verification-token";
import Link from "next/link";



async function AccountVerificationPage({params} : {params : Promise<{slug : string}>}) {

    const param = await params
    const token = param.slug

    const verificationToken = await prisma.verificationToken.findUnique({ 
        where : { 
            token 
        }, 
        
    })

    let isExpired = false

    
    if (verificationToken) { 
        const currentTime = new Date();
        const expiry_date = new Date(verificationToken.expires);

        
        if ( expiry_date <= currentTime) { 
            isExpired = true
            const newToken = await generateVerificationToken(verificationToken.email)
            sendVerificationEmail(newToken.email,newToken.token)


        } else {
            let existingUser;  
            if (verificationToken.emailReplaced) { 
                 existingUser = await getUserByEmail(verificationToken.emailReplaced)
            } else { 
                existingUser = await getUserByEmail(verificationToken.email)
            }
            
            
            if (existingUser) { 
                await prisma.user.update({ 
                    where : { 
                        id : existingUser.id
                    }, 
                    data: { 
                        emailVerified : currentTime, 
                        email : verificationToken.email
                        
        
                    }
                })
            }
            
    
            await prisma.verificationToken.delete({
                where : { 
                    id : verificationToken.id,
                }
            })
        }
        
        
    }

    



    return <div className="fixed top-0 w-full h-screen flex justify-center items-center">

        <Card>
            <CardHeader>
                <CardTitle>{verificationToken ? ( isExpired ? "Token Expired " : "Account Verified !"):"Token not found"}</CardTitle>
            </CardHeader>
            <CardDescription className="flex justify-center items-center">

                {isExpired && <div>New Verification Token sent !</div>}
                <Button variant={"link"} asChild><Link href={"/signin"}>Head to sign in</Link></Button>
            </CardDescription>
        </Card>

    </div>
}

export default AccountVerificationPage;