import { defineStore } from 'pinia'
import type { HomeStoreTemp } from '../types/home'

export const useTempHomeStore = defineStore({
  id: 'tempHome',
  persist: false,
  state: (): HomeStoreTemp => ({
    search: {
      keywords: '',
      type: 'topic',
      page: 1,
      limit: 7,
      sortField: 'updated',
      sortOrder: 'desc',
      isLoading: true
    },

    topics: [],
    savedPosition: 0,
    page: 1,

    isShowSearch: false
  }),
  getters: {},
  actions: {
    resetSearchStatus() {
      this.search.page = 1
      this.search.limit = 7
      this.search.isLoading = true
    }
  }
})
