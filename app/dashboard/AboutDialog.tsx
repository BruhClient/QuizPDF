"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { CircleHelp, Instagram } from "lucide-react"
import Link from "next/link"

import React from 'react'
import { SiDrizzle, SiNextdotjs, SiOpenai, SiShadcnui, SiTelegram } from "react-icons/si"

const icons = [
    {
        name : "Drizzle", 
        Icon : SiDrizzle
    },
    {
        name : "Shadcn", 
        Icon : SiShadcnui
    },
    {
        name : "OpenAi", 
        Icon : SiOpenai
    },
    {
        name : "NextJs", 
        Icon : SiNextdotjs
    }
]

const AboutDialog = () => {
  return (
    <Dialog>
        <DialogTrigger asChild><Button variant={"outline"}><CircleHelp />About </Button></DialogTrigger>
    <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-xl">Welcome to QuizPDF</DialogTitle>
      
    </DialogHeader>
    <div className="flex gap-2">
        <Link href={"#"} className="flex items-center gap-1 text-sm text-muted-foreground underline underline-offset-2"><Instagram size={16} /> Instagram</Link>
        <Link href={"#"} className="flex items-center gap-1 text-sm text-muted-foreground underline underline-offset-2"><SiTelegram size={16} /> Telegram</Link>
    </div>
    <DialogDescription>
        QuizPDF is a quiz application integrates well with PDFs and OpenAi's API . 
    </DialogDescription>
    <Separator />
    <div>
        Built with
    </div>
    <div className="flex gap-3 flex-wrap">
        
        {icons.map(({Icon,name}) => <div  key={name} className="flex items-center gap-2 border-2 px-2 py-1 rounded-lg text-sm "><Icon size={18}/> {name} </div>)}
        
    </div>
  </DialogContent>
</Dialog>
  )
}

export default AboutDialog
