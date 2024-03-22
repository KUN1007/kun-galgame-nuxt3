import { defineStore } from 'pinia'

interface CategoryStorePersist {
  category: 'galgame' | 'technique' | 'others'
}

export const useKUNGalgameCategoryStore = defineStore({
  id: 'KUNGalgameCategory',
  persist: true,
  state: (): CategoryStorePersist => ({
    category: 'galgame'
  })
})
