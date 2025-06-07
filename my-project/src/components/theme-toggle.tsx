"use client"

import { Button } from "@/components/ui/button"
import { LuMoon ,LuSun } from "react-icons/lu";

import { useDarkMode } from "@/context/darkModeContext"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleDarkMode}
      className={cn(
        "transition-all duration-300 hover:scale-105",
        sizeClasses[size],
        isDarkMode
          ? "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white"
          : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50",
        className,
      )}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <LuSun  className={cn("transition-all", iconSizes[size])} />
      ) : (
        <LuMoon className={cn("transition-all", iconSizes[size])} />
      )}
    </Button>
  )
}
