type SortField = 'time' | 'amount'
export type BalanceType = 'income' | 'expenditure'

export interface BalanceRequestData {
  page: string
  limit: string
  type: BalanceType
  language: Language
  sortField: SortField
  sortOrder: KunOrder
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
