import type { PoolStoreTemp } from '~/store/types/pool'

export const useTempPoolStore = defineStore({
  id: 'tempPool',
  persist: false,
  state: (): PoolStoreTemp => ({
    savedPosition: 0,

    topics: []
  }),
  actions: {
    resetPageStatus() {
      this.topics = []
      this.savedPosition = 0
    }
  }
})
