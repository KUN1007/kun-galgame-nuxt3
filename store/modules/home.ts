import { defineStore } from 'pinia'
import type { HomeStorePersist } from '../types/home'

export const usePersistKUNGalgameHomeStore = defineStore({
  id: 'KUNGalgameHome',
  persist: true,
  state: (): HomeStorePersist => ({
    searchHistory: [],

    fold: {
      updates: true,
      topics: true,
      galgames: true,
      resources: true
    }
  })
})
