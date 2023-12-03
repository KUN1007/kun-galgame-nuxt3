import { defineStore } from 'pinia'

import type {
  BalanceIncomeRequestData,
  BalanceExpenditureRequestData,
  BalanceIncomeResponseData,
  BalanceExpenditureResponseData,
  BalancePLStatementResponseData,
} from '@/api'

import { getIncomeApi, getExpenditureApi, getPLStatementApi } from '@/api'

interface BalanceStore {
  income: BalanceIncomeRequestData
  expenditure: BalanceExpenditureRequestData
}

export const useTempBalanceStore = defineStore({
  id: 'tempBalance',
  persist: false,
  state: (): BalanceStore => ({
    income: {
      page: 0,
      limit: 0,
      sortField: 'time',
      sortOrder: 'desc',
    },
    expenditure: {
      page: 0,
      limit: 0,
      sortField: 'time',
      sortOrder: 'desc',
    },
  }),
  getters: {},
  actions: {
    async getIncome(): Promise<BalanceIncomeResponseData> {
      const requestData: BalanceIncomeRequestData = {
        page: this.income.page,
        limit: this.income.limit,
        sortField: this.income.sortField,
        sortOrder: this.income.sortOrder,
      }
      return await getIncomeApi(requestData)
    },

    async getExpenditure(): Promise<BalanceExpenditureResponseData> {
      const requestData: BalanceExpenditureRequestData = {
        page: this.income.page,
        limit: this.income.limit,
        sortField: this.income.sortField,
        sortOrder: this.income.sortOrder,
      }
      return await getExpenditureApi(requestData)
    },

    async getPLStatement(): Promise<BalancePLStatementResponseData> {
      return await getPLStatementApi()
    },
  },
})
