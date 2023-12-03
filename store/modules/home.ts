import { defineStore } from 'pinia'
import type { HomeStorePersist } from '../types/home'

export const usePersistKUNGalgameHomeStore = defineStore({
  id: 'KUNGalgameHome',
  persist: true,
  state: (): HomeStorePersist => ({
    isActiveMainPageAside: true,

    searchHistory: [],
  }),
})
