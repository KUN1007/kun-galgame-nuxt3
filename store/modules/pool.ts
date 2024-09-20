import { defineStore } from 'pinia'

export const usePersistPoolStore = defineStore({
  id: 'KUNGalgamePool',
  persist: true,
  state: () => ({
    isSimpleMode: false
  })
})
