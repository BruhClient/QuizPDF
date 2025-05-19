"use client"

import useSessionUser from "@/hooks/use-session-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Check, LogOut, Settings, Sparkles, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import EditProfileForm from "../forms/profile";
import ProfileImageUploader from "../ProfileImageUploader";
import { DEFAULT_ROUTE } from "@/route";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { createCheckoutSession } from "@/server/actions/stripe";
import { showErrorToast } from "@/lib/toast";


const CustomCheck = () => <div className='bg-green-400 p-1 rounded-full '><Check className='text-black' size={15}/></div>


function UserProfile() {
    const user = useSessionUser()
    const [isPending,startTransition] = useTransition()
   const checkout = async () => { 
        startTransition(() => { 
            createCheckoutSession().then((data) => { 
                if (data.error) { 
                    showErrorToast()
                }
            })
        })
   }
    if (!user) { 
        return <Skeleton className="w-10 aspect-square rounded-full" />
    }

    
    return ( <DropdownMenu>
        <DropdownMenuTrigger>

         
                    <div className="flex items-center gap-3">
                        <Badge>
                            {user.plan}
                        </Badge>
                        <Avatar className="w-12 h-12" >
                            <AvatarImage src={user.image} alt="Profile" className="object-cover" ></AvatarImage>
                            <AvatarFallback><User size={20}/></AvatarFallback>
                        </Avatar>
                    </div>
                    

           
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">

            <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={user.image ?? undefined} alt="Profile" className="object-cover" ></AvatarImage>
                    <AvatarFallback><User/></AvatarFallback>
                </Avatar>
                <div>
                    <div>{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
                
                
            </div>
            <DropdownMenuSeparator />
            { 
                user.plan === "Free" && <>
                <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Sparkles /> Upgrade to Pro
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex gap-2 items-center"><Sparkles size={20}/> Pro Plan</DialogTitle>
                            <DialogDescription>One-time payment of $39</DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                            <CustomCheck /> Unlimited Quizzes
                        </div>
                        <div className="flex items-center gap-2">
                            <CustomCheck /> 30 MB File Upload
                        </div>
                        <div className="flex items-center gap-2">
                            <CustomCheck /> 24/7 Support
                        </div>
                        <Button onClick={() => checkout()} disabled={isPending}>
                            Get Pro Plan   
                        </Button>
                        
                        
                        
                    </DialogContent>
                </Dialog>
                <DropdownMenuSeparator />
                
                </>
            }
            
            
            
            

                <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><Settings /> Account settings</DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex gap-2 items-center"><Settings /> Account settings</DialogTitle>
                            <DialogDescription>Make changes to your account here</DialogDescription>
                        </DialogHeader>
                        <ProfileImageUploader initialImage={user.image}/>
                        <EditProfileForm/>
                    </DialogContent>
                </Dialog>
                
           
       
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({
                callbackUrl : DEFAULT_ROUTE
            })}>
                <LogOut />Sign out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu> );
}

export default UserProfile;