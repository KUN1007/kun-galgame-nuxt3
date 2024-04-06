import { defineStore } from 'pinia'

export const usePersistMessageStore = defineStore({
  id: 'KUNGalgameMessage',
  persist: true,
  state: () => ({
    autoRead: false
  })
})
