import type { PoolStoreTemp } from '~/store/types/pool'

export const useTempPoolStore = defineStore({
  id: 'tempPool',
  persist: false,
  state: (): PoolStoreTemp => ({
    savedPosition: 0,
    page: 1,

    topics: []
  }),
  actions: {
    resetPageStatus() {
      this.topics = []
      this.page = 1
      this.savedPosition = 0
    }
  }
})
