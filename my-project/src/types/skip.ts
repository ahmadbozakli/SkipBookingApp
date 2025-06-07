export interface RawSkipData {
  id: number
  size: number
  hire_period_days: number
  transport_cost: number | null
  per_tonne_cost: number | null
  price_before_vat: number
  vat: number
  postcode: string
  area: string
  forbidden: boolean
  created_at: string
  updated_at: string
  allowed_on_road: boolean
  allows_heavy_waste: boolean
  image: string
}

export interface ProcessedSkipData {
  id: number
  name: string
  size: string
  price: number
  priceBeforeVat: number
  vat: number
  perfect: string
  dimensions: string
  capacity: number
  hirePeriod: number
  allowedOnRoad: boolean
  allowsHeavyWaste: boolean
  transportCost: number | null
  perTonneCost: number | null
  postcode: string
  image: string
  actualSize: number
  popularity?: string | null
}

export interface InfoRowProps {
  label: string
  value: string | number | boolean
  isBoolean?: boolean
  booleanTrueLabel?: string
  booleanFalseLabel?: string
  highlight?: boolean
  className?: string
}
