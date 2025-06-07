"use client"

import { Button } from "@/components/ui/button"
import { LuChevronRight ,LuPackage} from "react-icons/lu";

import { InfoRow } from "./info-row"
import { useDarkMode } from "@/context/darkModeContext"
import { cn } from "@/lib/utils"
import type { ProcessedSkipData } from "@/types/skip"

interface SkipDetailsCardProps {
  skip: ProcessedSkipData | null
}

export function SkipDetailsCard({ skip }: SkipDetailsCardProps) {
  const { isDarkMode } = useDarkMode()

  if (!skip) {
    return (
      <div
        className={cn(
          "rounded-3xl shadow-xl border overflow-hidden",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        )}
      >
        <div className="flex items-center justify-center min-h-[300px] p-8">
          <div className="text-center">
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                isDarkMode ? "bg-gray-700" : "bg-gray-100",
              )}
            >
              <LuPackage className={cn("h-8 w-8", isDarkMode ? "text-gray-400" : "text-gray-500")} />
            </div>
            <p className={cn("text-lg", isDarkMode ? "text-gray-400" : "text-gray-600")}>
              Select a skip to view details
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-3xl shadow-xl border overflow-hidden",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
      )}
    >
      <div className={cn("p-6 border-b", isDarkMode ? "border-gray-700" : "border-gray-200")}>
        <h2 className={cn("text-2xl md:text-3xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
          {skip.name}
        </h2>
        <p className={cn("mt-1", isDarkMode ? "text-gray-400" : "text-gray-600")}>
          Detailed specifications and pricing
        </p>
      </div>

      <div className="p-6 space-y-1">
        <InfoRow label="Price (inc. VAT)" value={skip.price} highlight />
        <InfoRow label="Price (ex. VAT)" value={skip.priceBeforeVat} />
        <InfoRow label="VAT (20%)" value={`£${(skip.price - skip.priceBeforeVat).toFixed(2)}`} />
        <InfoRow label="Hire Period" value={`${skip.hirePeriod} days`} />
        <InfoRow label="Perfect for" value={skip.perfect} />
        <InfoRow label="Dimensions (L×W×H)" value={skip.dimensions} />
        <InfoRow label="Capacity" value={`~${skip.capacity} bags`} />
        <InfoRow
          label="Road Placement"
          value={skip.allowedOnRoad}
          isBoolean={true}
          booleanTrueLabel="Permitted"
          booleanFalseLabel="Not Permitted"
        />
        <InfoRow
          label="Heavy Waste"
          value={skip.allowsHeavyWaste}
          isBoolean={true}
          booleanTrueLabel="Accepted"
          booleanFalseLabel="Not Accepted"
        />
        {skip.transportCost != null && <InfoRow label="Transport Cost" value={`£${skip.transportCost.toFixed(2)}`} />}
        {skip.perTonneCost != null && <InfoRow label="Per Tonne Cost" value={`£${skip.perTonneCost.toFixed(2)}`} />}
        <InfoRow label="Postcode Area" value={skip.postcode} />
      </div>

      <div className="p-6 pt-0">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 text-lg font-bold shadow-lg">
          Book {skip.name} Now
          <LuChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
