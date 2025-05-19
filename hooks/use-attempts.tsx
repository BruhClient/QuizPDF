"use client "
import { DEFAULT_FETCH_LIMIT } from "@/data/constants"
import { useInfiniteQuery } from "@tanstack/react-query"




interface UseEventsOptions {
    quizId : string
     
}

export const useAttempts = ({quizId}: UseEventsOptions) => {
    const query = useInfiniteQuery({
      queryKey: ["attempts",quizId],
      
      
      queryFn: async ({ pageParam = 1 }) => {
        
        const res = await fetch(`/api/attempt?&take=${DEFAULT_FETCH_LIMIT}&page=${pageParam}&quizId=${quizId}`)
        if (!res.ok) throw new Error("Failed to fetch Quiz")
        
        return res.json() ?? []
      },
      staleTime : 0 ,
      
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {

       
        if (lastPage.length < DEFAULT_FETCH_LIMIT) {
          return undefined // No more pages
        }
        return lastPageParam + 1
      },
      initialPageParam: 1,
     
     
     
    })
  
    return {
      ...query,
      attempts: query.data?.pages.flat() ?? [],
    }
  }