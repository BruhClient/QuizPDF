"use client"

import React from 'react'
import { ThemeProvider } from './ThemeProvider'
import { SessionProvider } from 'next-auth/react'

const AppProvider = ({children} : {children : React.ReactNode}) => {
  return (
    
          
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            
          <SessionProvider>
          
            {children}
    
    
          </SessionProvider>

          
        </ThemeProvider>
     
  )
}

export default AppProvider
