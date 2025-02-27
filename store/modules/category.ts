import { defineStore } from 'pinia'

interface CategoryStorePersist {
  category: 'galgame' | 'technique' | 'others'
}

export const usePersistCategoryStore = defineStore('KUNGalgameCategory', {
  persist: true,
  state: (): CategoryStorePersist => ({
    category: 'galgame'
  })
})
