"use client "
import { DEFAULT_FETCH_LIMIT } from "@/data/constants"
import { useInfiniteQuery } from "@tanstack/react-query"




interface UseEventsOptions {
    userId : string
     
}

export const useQuizzes = ({userId}: UseEventsOptions) => {
    const query = useInfiniteQuery({
      queryKey: ["quizzes",userId],
      
      
      queryFn: async ({ pageParam = 1 }) => {
        
        const res = await fetch(`/api/quiz?&take=${DEFAULT_FETCH_LIMIT}&page=${pageParam}`)
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
      quizzes: query.data?.pages.flat() ?? [],
    }
  }