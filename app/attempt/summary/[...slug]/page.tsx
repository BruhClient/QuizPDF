
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import SummaryDisplay from '../_components/SummaryDisplay'

const AttemptSummaryPage = async ({params} : {params : Promise<{slug : string}>}) => {
  const id = (await params).slug[0]
  const session = await auth()

  if (!session) redirect("/")
  

  return (
    <div className='flex justify-center flex-col items-center gap-3 px-4 pb-8'>
      <Suspense fallback="Loading...">
        <SummaryDisplay userId={session.user.id} id={id}/>
      </Suspense>
        
    </div>
  )
}

export default AttemptSummaryPage
