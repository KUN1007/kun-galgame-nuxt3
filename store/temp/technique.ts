import { defineStore } from 'pinia'

import { getTechniqueTopicApi } from '@/api'
import type {
  TechniqueTopicsRequestData,
  TechniqueTopicResponseData,
} from '@/api'

import type { TechniqueStoreTemp } from '@/store/types/technique'

export const useTempTechniqueStore = defineStore({
  id: 'tempTechnique',
  persist: false,
  state: (): TechniqueStoreTemp => ({
    page: 1,
    limit: 10,
    sortField: 'time',
    sortOrder: 'desc',
  }),
  actions: {
    async getTopics(): Promise<TechniqueTopicResponseData> {
      const requestData: TechniqueTopicsRequestData = {
        page: this.page,
        limit: this.limit,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
      }

      return await getTechniqueTopicApi(requestData)
    },

    resetPageStatus() {
      this.page = 1
      this.limit = 10
    },
  },
})
