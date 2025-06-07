import type { RawSkipData, ProcessedSkipData } from "@/types/skip"
import { rawSkipData } from "@/data/skip-data"
import { getSkipName, getPerfectUse, getDimensions } from "./skip-helpers"

export function processSkipData(data: RawSkipData[]): ProcessedSkipData[] {
  return data.map((skip) => {
    const totalPrice = skip.price_before_vat * (1 + skip.vat / 100)
    return {
      id: skip.id,
      name: getSkipName(skip.size),
      size: `${skip.size} Yard`,
      price: Math.round(totalPrice),
      priceBeforeVat: skip.price_before_vat,
      vat: skip.vat,
      perfect: getPerfectUse(skip.size, skip.allows_heavy_waste),
      dimensions: getDimensions(skip.size),
      capacity: skip.size * 6,
      hirePeriod: skip.hire_period_days,
      allowedOnRoad: skip.allowed_on_road,
      allowsHeavyWaste: skip.allows_heavy_waste,
      transportCost: skip.transport_cost,
      perTonneCost: skip.per_tonne_cost,
      postcode: skip.postcode,
      image: skip.image,
      actualSize: skip.size,
    }
  })
}

export const allSkipsData = processSkipData(rawSkipData)
