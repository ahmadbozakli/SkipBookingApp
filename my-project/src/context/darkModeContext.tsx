"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

interface DarkModeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: true, // Default to dark mode
  toggleDarkMode: () => {},
})

interface DarkModeProviderProps {
  children: ReactNode
}

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode")
      return stored ? JSON.parse(stored) : true 
    }
    return true
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark", isDarkMode)
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode))
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode((prev: boolean) => !prev)

  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>
}

export const useDarkMode = () => useContext(DarkModeContext)
