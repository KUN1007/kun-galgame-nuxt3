import type { SearchStoreTemp } from '../types/search'

export const useTempSearchStore = defineStore({
  id: 'tempSearch',
  persist: false,
  state: (): SearchStoreTemp => ({
    keywords: ''
  })
})
