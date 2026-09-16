// Single source of truth for the valuation fee. Imported by the serverless quote function
// (which computes the price) and by the Pricing section (which only displays the tiers).
// Tiers are provisional ("TBD further" in the Technical Ops briefing, section 0.2).

export const BASE_FEE_EUR = 4000

export interface RevenueTier {
  /** Inclusive lower bound, EUR millions */
  fromEurM: number
  /** Exclusive upper bound, EUR millions; null = open-ended */
  toEurM: number | null
  addOnEur: number
}

export const REVENUE_TIERS: RevenueTier[] = [
  { fromEurM: 0, toEurM: 1, addOnEur: 0 },
  { fromEurM: 1, toEurM: 5, addOnEur: 1000 },
  { fromEurM: 5, toEurM: 10, addOnEur: 2000 },
  { fromEurM: 10, toEurM: 20, addOnEur: 3000 },
  { fromEurM: 20, toEurM: null, addOnEur: 4000 },
]

// Optional employee add-on; empty until pricing is finalised.
export interface EmployeeTier {
  fromEmployees: number
  addOnEur: number
}
export const EMPLOYEE_TIERS: EmployeeTier[] = []

export const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard', turnaround: '10 business days', addOnEur: 0 },
  { id: 'fast', label: 'Fast', turnaround: '5 business days', addOnEur: 1000 },
  { id: 'express', label: 'Express', turnaround: '72 hours', addOnEur: 1500 },
] as const

export interface FeeBreakdown {
  baseEur: number
  revenueAddOnEur: number
  employeeAddOnEur: number
  totalEur: number
}

export function computeValuationFee(revenueEurM: number, employees: number): FeeBreakdown {
  const revenueTier = REVENUE_TIERS.find(
    (t) => revenueEurM >= t.fromEurM && (t.toEurM === null || revenueEurM < t.toEurM),
  )
  const revenueAddOnEur = revenueTier?.addOnEur ?? 0
  const employeeAddOnEur =
    [...EMPLOYEE_TIERS].reverse().find((t) => employees >= t.fromEmployees)?.addOnEur ?? 0
  return {
    baseEur: BASE_FEE_EUR,
    revenueAddOnEur,
    employeeAddOnEur,
    totalEur: BASE_FEE_EUR + revenueAddOnEur + employeeAddOnEur,
  }
}

export const formatEur = (value: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
