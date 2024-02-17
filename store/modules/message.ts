import { defineStore } from 'pinia'

export const useKUNGalgameMessageStore = defineStore({
  id: 'KUNGalgameMessage',
  persist: true,
  state: () => ({
    autoRead: false,
  }),
})
