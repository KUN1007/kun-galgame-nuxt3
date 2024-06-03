import type { GalgameStoreTemp } from '~/store/types/galgame/galgame'

export const useTempGalgameStore = defineStore({
  id: 'tempGalgame',
  persist: false,
  state: (): GalgameStoreTemp => ({
    page: 1,
    limit: 24,
    type: 'all',
    language: 'all',
    platform: 'all',
    sortField: 'time',
    sortOrder: 'desc'
  }),
  actions: {}
})
