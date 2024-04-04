import type { BalanceRequestData } from '~/types/api/balance'

interface BalanceStore {
  balance: BalanceRequestData
}

export const useTempBalanceStore = defineStore({
  id: 'tempBalance',
  persist: false,
  state: (): BalanceStore => ({
    balance: {
      page: '0',
      limit: '0',
      type: 'expenditure',
      language: 'en-us',
      sortField: 'time',
      sortOrder: 'desc'
    }
  }),
  getters: {},
  actions: {}
})
