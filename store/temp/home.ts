import { defineStore } from 'pinia'
import type { HomeStoreTemp } from '../types/home'

export const useTempHomeStore = defineStore({
  id: 'tempHome',
  persist: false,
  state: (): HomeStoreTemp => ({
    search: {
      keywords: '',
      category: ['Galgame', 'Technique', 'Others'],
      page: 1,
      limit: 7,
      sortField: 'updated',
      sortOrder: 'desc',
      isLoading: true,
    },
    topic: {
      category: ['Galgame'],
      page: 1,
      limit: 10,
      sortField: 'updated',
      sortOrder: 'desc',
    },

    topics: [],
    savedPosition: 0,

    isShowSearch: false,
  }),
  getters: {},
  actions: {
    resetSearchStatus() {
      this.search.page = 1
      this.search.limit = 7
      this.search.isLoading = true
    },

    resetHomePageStatus() {
      this.topic.page = 1
      this.topic.limit = 10
      this.topics = []
    },
  },
})
