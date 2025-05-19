"use client"

import React, { useTransition } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { deleteQuiz } from '@/server/db/quiz'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { useQueryClient } from '@tanstack/react-query'


const DeleteQuizButton = ({id} : {id : string}) => {
    const [isPending,startTransition] = useTransition()
    const queryClient = useQueryClient()
    const handleDelete = () => { 
        startTransition(() => { 
            deleteQuiz(id).then((data) => { 
                if (!data) { 
                    showErrorToast()
                } else { 
                    
                    showSuccessToast("Your Quiz has been deleted")

                    queryClient.invalidateQueries({queryKey : ["quizzes",data.userId]})
                    
                }
            })
        })
        
    }
  return (
    <AlertDialog>
  <AlertDialogTrigger asChild><Button size={"icon"} variant={"destructive"}><Trash /></Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction disabled={isPending} onClick={() => {
        handleDelete()
      }}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default DeleteQuizButton
