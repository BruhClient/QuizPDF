import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sendVerificationEmail } from "@/server/db/auth/mail";
import { getUserByEmail, updateUserByEmail } from "@/server/db/users";
import { deleteVerificationTokenById, generateVerificationToken, getVerificationTokenByToken } from "@/server/db/auth/verification-token";
import Link from "next/link";



async function AccountVerificationPage({params} : {params : Promise<{slug : string}>}) {

    const param = await params
    const token = param.slug

    const verificationToken = await getVerificationTokenByToken(token)



    let isExpired = false

    
    if (verificationToken) { 
        const currentTime = new Date();
        const expiry_date = new Date(verificationToken.expiresAt);

        
        if ( expiry_date <= currentTime) { 
            isExpired = true
            const newToken = await generateVerificationToken(verificationToken.email!)
            sendVerificationEmail(newToken.email,newToken.token)


        } else {
            let existingUser;  
            if (verificationToken.emailReplaced) { 
                 existingUser = await getUserByEmail(verificationToken.emailReplaced)
            } else { 
                existingUser = await getUserByEmail(verificationToken.email)
            }
            
            
            if (existingUser) { 
                await updateUserByEmail(existingUser.email,{ 
                    emailVerified : currentTime, 
                    email : verificationToken.email
                })
            }
            
            // Delete Verification Token 
            await deleteVerificationTokenById(verificationToken.id)
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