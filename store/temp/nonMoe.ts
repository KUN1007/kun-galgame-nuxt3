import { defineStore } from 'pinia'

import type { NonMoeLogRequestData, NonMoeGetLogsResponseData } from '@/api'

import { getNonMoeLogsApi } from '@/api'

export const useTempNonMoeStore = defineStore({
  id: 'tempNonMoe',
  persist: false,
  state: (): NonMoeLogRequestData => ({
    page: 1,
    limit: 30,
    sortOrder: 'desc',
  }),
  getters: {},
  actions: {
    async getLogs(): Promise<NonMoeGetLogsResponseData> {
      const requestData: NonMoeLogRequestData = {
        page: this.page,
        limit: this.limit,
        sortOrder: this.sortOrder,
      }
      return await getNonMoeLogsApi(requestData)
    },
  },
})
