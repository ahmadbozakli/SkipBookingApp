"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { IoMenu } from "react-icons/io5"
import { CiDeliveryTruck } from "react-icons/ci"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { allSkipsData } from "@/utils/processed-skip-data"
import { SkipSelector } from "@/components/skip-selector"
import { SkipDetailsCard } from "@/components/skip-details-card"
import { SkipVisualization } from "@/components/skip-visualization"
import { SkipQuickFacts } from "@/components/skip-quick-facts"
import { BookingHeader } from "@/components/booking-header"
import { useDarkMode } from "@/context/darkModeContext"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const { isDarkMode } = useDarkMode()
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null)
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false)

  // Initialize with first skip
  useEffect(() => {
    if (allSkipsData.length > 0 && selectedSkipId === null) {
      setSelectedSkipId(allSkipsData[0].id)
    }
  }, [selectedSkipId])

  // Memoize selected skip to prevent unnecessary recalculations
  const selectedSkip = useMemo(() => {
    return allSkipsData.find((s) => s.id === selectedSkipId) || allSkipsData[0] || null
  }, [selectedSkipId])

  const handleSelectSkip = useCallback(
    (skipId: number) => {
      setSelectedSkipId(skipId)
      if (isMobileSheetOpen) {
        setIsMobileSheetOpen(false)
      }
    },
    [isMobileSheetOpen],
  )

  const handleMobileSheetToggle = useCallback((open: boolean) => {
    setIsMobileSheetOpen(open)
  }, [])

  // Memoize expensive components
  const memoizedSkipSelector = useMemo(
    () => <SkipSelector skips={allSkipsData} selectedSkipId={selectedSkipId} onSelectSkip={handleSelectSkip} />,
    [selectedSkipId, handleSelectSkip],
  )

  const memoizedMobileSkipSelector = useMemo(
    () => (
      <SkipSelector
        skips={allSkipsData}
        selectedSkipId={selectedSkipId}
        onSelectSkip={handleSelectSkip}
        isMobileSheet={true}
      />
    ),
    [selectedSkipId, handleSelectSkip],
  )

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-cyan-50",
      )}
    >
      <BookingHeader currentStep="select-skip" />

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Section - Skip Selection */}
            <section className="w-full lg:w-2/5 flex flex-col gap-6">
              {/* Mobile Skip Selector */}
              <div className="lg:hidden">
                <Sheet open={isMobileSheetOpen} onOpenChange={handleMobileSheetToggle}>
                  <SheetTrigger asChild>
                    <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 text-lg shadow-lg">
                      <IoMenu className="h-5 w-5" />
                      <span>Select Skip ({selectedSkip?.name || "..."})</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className={cn(
                      "w-[85vw] max-w-md p-0 border",
                      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
                    )}
                  >
                    <SheetHeader className="p-6 bg-blue-600">
                      <SheetTitle className="text-white text-xl">Available Skips</SheetTitle>
                    </SheetHeader>
                    <div className="p-6">{memoizedMobileSkipSelector}</div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Skip Selector */}
              <div className="hidden lg:block">
                <div
                  className={cn(
                    "rounded-3xl shadow-xl border overflow-hidden",
                    isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white/70 backdrop-blur-xl border-gray-200",
                  )}
                >
                  <div className={cn("px-6 pt-6 border-b pb-6", isDarkMode ? "border-gray-700" : "border-gray-200")}>
                    <h2
                      className={cn(
                        "text-xl font-bold flex items-center gap-3",
                        isDarkMode ? "text-white" : "text-blue-600",
                      )}
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <CiDeliveryTruck className="h-6 w-6 text-white" />
                      </div>
                      Available Skip Sizes
                    </h2>
                  </div>
                  <div className="p-6">{memoizedSkipSelector}</div>
                </div>
              </div>

              {/* Skip Details Card */}
              <SkipDetailsCard skip={selectedSkip} />
            </section>

            {/* Right Section - Visualization & Info */}
            <aside className="w-full lg:w-3/5 flex flex-col gap-8 lg:sticky lg:top-10 self-start">
              <SkipVisualization skip={selectedSkip} />

              {selectedSkip && <SkipQuickFacts skip={selectedSkip} />}
            </aside>
          </div>
        </div>

        {/* Bottom Summary Bar */}
        {selectedSkip && (
          <div
            className={cn(
              "fixed bottom-0 left-0 right-0 border-t p-4 lg:hidden backdrop-blur-sm",
              isDarkMode ? "bg-gray-800/95 border-gray-700" : "bg-white/95 border-gray-200",
            )}
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
                <div className="font-semibold">{selectedSkip.name}</div>
                <div className="text-blue-500 font-bold">£{selectedSkip.price}</div>
                <div className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                  {selectedSkip.hirePeriod} day hire
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50",
                  )}
                >
                  Back
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Continue</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
