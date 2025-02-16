export const usePersistKUNGalgameSearchStore = defineStore('KUNGalgameSearch', {
  persist: true,
  state: () => ({
    searchHistory: [] as string[]
  })
})
