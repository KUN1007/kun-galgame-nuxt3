type SortField = 'time' | 'amount'
type SortOrder = 'asc' | 'desc'

export interface BalanceIncomeRequestData {
  page: string
  limit: string
  sortField: SortField
  sortOrder: SortOrder
}

export interface BalanceExpenditureRequestData {
  page: string
  limit: string
  sortField: SortField
  sortOrder: SortOrder
}

export interface BalanceIncome {
  iid: number
  reason: string
  time: number
  amount: number
}

export interface BalanceExpenditure {
  eid: number
  reason: string
  time: number
  amount: number
}

export interface PLStatement {
  totalIncome: number
  totalExpenditure: number
  profitLoss: number
}
