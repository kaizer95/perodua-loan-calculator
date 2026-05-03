export interface LoanInputs {
  otrPrice: number
  rebate: number
  ncdPercent: number
  downpayment: number
}

export interface LoanSummary {
  otrPrice: number
  rebateAmount: number
  ncdRate: number
  ncdDiscount: number
  priceAfterRebate: number
  totalOtr: number
  downpayment: number
  loanAmount: number
}

export interface PaymentRow {
  years: number
  months: number
  interestRate: number
  monthly: number
}

export const DEFAULT_INTEREST_RATE = 2.6
export const DEFAULT_TENURES = [9, 7, 5] as const

export function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min
  }

  if (value > max) {
    return max
  }

  return value
}

export function toSafeNonNegativeNumber(value: number): number {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.max(0, value)
}

export function parseInputNumber(value: string): number {
  const parsed = Number.parseFloat(value)
  return toSafeNonNegativeNumber(parsed)
}

export function calculateLoanSummary(inputs: LoanInputs): LoanSummary {
  const otrPrice = toSafeNonNegativeNumber(inputs.otrPrice)
  const rebateAmount = toSafeNonNegativeNumber(inputs.rebate)
  const downpayment = toSafeNonNegativeNumber(inputs.downpayment)
  const ncdRate = clamp(toSafeNonNegativeNumber(inputs.ncdPercent), 0, 100) / 100

  const priceAfterRebate = Math.max(0, otrPrice - rebateAmount)
  const ncdDiscount = priceAfterRebate * ncdRate
  const totalOtr = Math.max(0, priceAfterRebate - ncdDiscount)
  const loanAmount = Math.max(0, totalOtr - downpayment)

  return {
    otrPrice,
    rebateAmount,
    ncdRate,
    ncdDiscount,
    priceAfterRebate,
    totalOtr,
    downpayment,
    loanAmount,
  }
}

export function calculateMonthlyPayment(
  loanAmount: number,
  years: number,
  interestRate: number,
): number {
  const safeLoanAmount = toSafeNonNegativeNumber(loanAmount)
  const safeYears = Math.max(1, Math.floor(toSafeNonNegativeNumber(years)))
  const safeInterestRate = toSafeNonNegativeNumber(interestRate)
  const months = safeYears * 12

  return (safeLoanAmount * (1 + (safeInterestRate / 100) * safeYears)) / months
}

export function buildPaymentRows(
  loanAmount: number,
  interestRate = DEFAULT_INTEREST_RATE,
  tenures: readonly number[] = DEFAULT_TENURES,
): PaymentRow[] {
  return tenures.map((years) => ({
    years,
    months: years * 12,
    interestRate,
    monthly: calculateMonthlyPayment(loanAmount, years, interestRate),
  }))
}
