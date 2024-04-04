type SortField = 'time' | 'amount'
type SortOrder = 'asc' | 'desc'
export type BalanceType = 'income' | 'expenditure'

export interface BalanceRequestData {
  page: string
  limit: string
  type: BalanceType
  language: Language
  sortField: SortField
  sortOrder: SortOrder
}

export interface Balance {
  bid: number
  type: BalanceType
  reason: string
  time: number
  amount: number
}

export interface PLStatement {
  totalIncome: number
  totalExpenditure: number
  profitLoss: number
}
