"use client"

import React, { useMemo, useCallback } from "react"
import { LuCircleCheck, LuSparkles } from "react-icons/lu"
import { cn } from "@/lib/utils"
import { useDarkMode } from "@/context/darkModeContext"
import type { ProcessedSkipData } from "@/types/skip"

interface SkipSelectorProps {
  skips: ProcessedSkipData[]
  selectedSkipId: number | null
  onSelectSkip: (id: number) => void
  isMobileSheet?: boolean
}

const SkipCard = React.memo(
  ({
    skip,
    isSelected,
    onSelect,
    isDarkMode,
  }: {
    skip: ProcessedSkipData
    isSelected: boolean
    onSelect: (id: number) => void
    isDarkMode: boolean
  }) => {
    const handleClick = useCallback(() => {
      onSelect(skip.id)
    }, [skip.id, onSelect])

    return (
      <button
        onClick={handleClick}
        className={cn(
          "relative p-5 rounded-2xl transition-all duration-300 text-center group border shadow-md hover:shadow-lg",
          isSelected
            ? isDarkMode
              ? "bg-gray-700 border-indigo-500 text-white transform scale-105 shadow-xl"
              : "bg-white border-indigo-500 text-black transform scale-105 shadow-xl"
            : isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50",
        )}
      >
        <div className="space-y-2">
          <div className="font-semibold text-lg">{skip.name}</div>
          <div
            className={cn(
              "text-sm",
              isSelected
                ? isDarkMode
                  ? "text-gray-300/80"
                  : "text-gray-500/80"
                : isDarkMode
                  ? "text-gray-400"
                  : "text-gray-500",
            )}
          >
            {skip.size}
          </div>
        </div>

        {isSelected && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <LuCircleCheck className="h-5 w-5 text-indigo-500" />
          </div>
        )}

        {skip.popularity && (
          <div className="absolute -top-2 -left-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
            <LuSparkles className="h-3 w-3 inline mr-1" />
            {skip.popularity}
          </div>
        )}
      </button>
    )
  },
)

SkipCard.displayName = "SkipCard"

const MobileSkipCard = React.memo(
  ({
    skip,
    isSelected,
    onSelect,
    isDarkMode,
  }: {
    skip: ProcessedSkipData
    isSelected: boolean
    onSelect: (id: number) => void
    isDarkMode: boolean
  }) => {
    const handleClick = useCallback(() => {
      onSelect(skip.id)
    }, [skip.id, onSelect])

    return (
      <button
        onClick={handleClick}
        className={cn(
          "w-full p-4 rounded-2xl text-left transition-all duration-300",
          isSelected
            ? isDarkMode
              ? "bg-indigo-600 text-white shadow-lg scale-105"
              : "border-2 border-indigo-500 text-indigo-700 shadow-lg scale-105"
            : isDarkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-gray-50 hover:bg-gray-100 text-gray-700",
        )}
      >
        <div className="font-semibold">{skip.name}</div>
        <div className="text-sm opacity-80">{skip.size}</div>
      </button>
    )
  },
)

MobileSkipCard.displayName = "MobileSkipCard"

export const SkipSelector = React.memo(
  ({ skips, selectedSkipId, onSelectSkip, isMobileSheet = false }: SkipSelectorProps) => {
    const { isDarkMode } = useDarkMode()

    const skipGroups = useMemo(() => {
      if (isMobileSheet) return []

      const groups = []
      const itemsPerRow = 2
      for (let i = 0; i < skips.length; i += itemsPerRow) {
        groups.push(skips.slice(i, i + itemsPerRow))
      }
      return groups
    }, [skips, isMobileSheet])

    if (isMobileSheet) {
      return (
        <div className="space-y-3">
          {skips.map((skip) => (
            <MobileSkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkipId === skip.id}
              onSelect={onSelectSkip}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {skipGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkipId === skip.id}
                onSelect={onSelectSkip}
                isDarkMode={isDarkMode}
              />
            ))}
            {group.length === 1 && <div className="hidden md:block"></div>}
          </div>
        ))}
      </div>
    )
  },
)

SkipSelector.displayName = "SkipSelector"
