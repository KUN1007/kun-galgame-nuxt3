import type { SearchStoreTemp } from '../types/search'

export const useTempSearchStore = defineStore('tempSearch', {
  persist: false,
  state: (): SearchStoreTemp => ({
    keywords: ''
  })
})
