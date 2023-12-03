import { defineStore } from 'pinia'

import { getPoolTopicApi } from '@/api'
import type { PoolTopicsRequestData, PoolTopicResponseData } from '@/api'

import type { PoolStoreTemp } from '@/store/types/pool'

export const useTempPoolStore = defineStore({
  id: 'tempPool',
  persist: false,
  state: (): PoolStoreTemp => ({
    page: 1,
    limit: 10,
    sortField: 'time',
    sortOrder: 'desc',

    isScrollToTop: false,
  }),
  actions: {
    async getTopics(): Promise<PoolTopicResponseData> {
      const requestData: PoolTopicsRequestData = {
        page: this.page,
        limit: this.limit,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
      }

      return await getPoolTopicApi(requestData)
    },

    resetPageStatus() {
      this.page = 1
      this.limit = 10
    },
  },
})
