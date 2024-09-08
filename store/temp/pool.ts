import type { PoolStoreTemp } from '~/store/types/pool'

export const useTempPoolStore = defineStore({
  id: 'tempPool',
  persist: false,
  state: (): PoolStoreTemp => ({
    savedPosition: 0,
    pageData: {
      page: 1,
      limit: 24,
      sortField: 'created',
      sortOrder: 'desc',
      category: 'all'
    },

    topics: []
  }),
  actions: {
    resetPageStatus() {
      this.topics = []
      this.pageData.page = 1
      this.savedPosition = 0
    }
  }
})
