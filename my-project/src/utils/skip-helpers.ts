export function getSkipName(size: number): string {
  if (size <= 4) return "Mini Skip"
  if (size <= 6) return "Small Skip"
  if (size <= 8) return "Medium Skip"
  if (size <= 12) return "Large Skip"
  if (size <= 16) return "Extra Large Skip"
  if (size <= 20) return "Maxi Skip"
  return "Industrial Skip"
}

export function getPerfectUse(size: number, allowsHeavyWaste: boolean): string {
  if (size <= 4) return "Garden clearance & small DIY"
  if (size <= 6) return "Home clearance & light renovation"
  if (size <= 8) return "Kitchen/bathroom renovation"
  if (size <= 12) return "Major home renovation"
  if (size <= 16) return "Large construction projects"
  if (size <= 20) return allowsHeavyWaste ? "Heavy construction waste" : "Large commercial clearance"
  return "Industrial & commercial projects"
}

export function getDimensions(size: number): string {
  const dimensionMap: { [key: number]: string } = {
    4: "6' × 4' × 3'",
    6: "8' × 5' × 3'",
    8: "10' × 5' × 4'",
    10: "12' × 6' × 4'",
    12: "14' × 6' × 4'",
    14: "16' × 6' × 5'",
    16: "18' × 6' × 5'",
    20: "20' × 8' × 6'",
    40: "20' × 8' × 8'",
  }
  return dimensionMap[size] || `${size}' × 6' × 4'`
}

export function getSkipColor(size: number): string {
  if (size <= 4) return "#FFA500" 
  if (size <= 8) return "#FFD700"
  if (size <= 12) return "#4169E1" 
  if (size <= 20) return "#8B4513" 
  return "#D2691E" 
}

export function getModelPath(skipSize: number): string {
  if (skipSize <= 4) return "/models/4Y.glb"
  if (skipSize <= 6) return "/models/6Y.glb"
  if (skipSize <= 8) return "/models/8Y.glb"
  if (skipSize <= 10) return "/models/10Y.glb"
  if (skipSize <= 12) return "/models/12Y.glb"
  if (skipSize <= 14) return "/models/14Y.glb"
  if (skipSize <= 16) return "/models/16Y.glb"
  if (skipSize <= 20) return "/models/20Y.glb"
  return "/models/40Y.glb"
}
