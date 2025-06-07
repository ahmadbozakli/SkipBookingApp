"use client"

import type React from "react"
import { LuCircleCheck ,LuCircleX} from "react-icons/lu";

import { cn } from "@/lib/utils"
import { useDarkMode } from "@/context/darkModeContext"
import type { InfoRowProps } from "../types/skip"

export function InfoRow({
  label,
  value,
  isBoolean = false,
  booleanTrueLabel = "Yes",
  booleanFalseLabel = "No",
  highlight = false,
  className,
}: InfoRowProps) {
  const { isDarkMode } = useDarkMode()

  let displayValue: React.ReactNode = String(value)
  let valueColorClass = highlight ? "text-blue-500 font-bold text-lg" : isDarkMode ? "text-gray-200" : "text-gray-900"

  if (isBoolean) {
    if (typeof value === "boolean") {
      displayValue = (
        <span className={cn("flex items-center", value ? "text-green-500" : "text-red-500")}>
          {value ? <LuCircleCheck className="h-4 w-4 mr-1" /> : <LuCircleX className="h-4 w-4 mr-1" />}
          {value ? booleanTrueLabel : booleanFalseLabel}
        </span>
      )
      valueColorClass = ""
    }
  } else if (typeof value === "number" && label.toLowerCase().includes("price")) {
    displayValue = `£${value.toFixed(2)}`
  } else if (typeof value === "number" && label.toLowerCase().includes("days")) {
    displayValue = `${value} days`
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between border-b py-3 last:border-b-0",
        isDarkMode ? "border-gray-700" : "border-gray-200",
        className,
      )}
    >
      <span className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-600")}>{label}</span>
      <span className={cn("font-medium text-right", valueColorClass)}>{displayValue}</span>
    </div>
  )
}
