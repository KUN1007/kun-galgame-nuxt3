import type { HomeStorePersist } from '../types/home'

export const usePersistKUNGalgameHomeStore = defineStore({
  id: 'KUNGalgameHome',
  persist: true,
  state: (): HomeStorePersist => ({
    fold: {
      updates: true,
      topics: true,
      galgames: true,
      resources: true,
      sitemaps: true
    }
  })
})
