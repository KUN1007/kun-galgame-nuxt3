import type {
  BalanceIncomeRequestData,
  BalanceExpenditureRequestData
} from '~/types/api/balance'

interface BalanceStore {
  income: BalanceIncomeRequestData
  expenditure: BalanceExpenditureRequestData
}

export const useTempBalanceStore = defineStore({
  id: 'tempBalance',
  persist: false,
  state: (): BalanceStore => ({
    income: {
      page: '0',
      limit: '0',
      sortField: 'time',
      sortOrder: 'desc'
    },
    expenditure: {
      page: '0',
      limit: '0',
      sortField: 'time',
      sortOrder: 'desc'
    }
  }),
  getters: {},
  actions: {}
})
