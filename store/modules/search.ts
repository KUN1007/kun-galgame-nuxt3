export const usePersistKUNGalgameSearchStore = defineStore({
  id: 'KUNGalgameSearch',
  persist: true,
  state: () => ({
    searchHistory: [] as string[]
  })
})
