import type { PoolStoreTemp } from '~/store/types/pool'

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
    resetPageStatus() {
      this.page = 1
      this.limit = 10
    },
  },
})
