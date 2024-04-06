import type { GalgameStorePersist } from '~/store/types/galgame/galgame'

export const usePersistGalgameStore = defineStore({
  id: 'KUNGalgamePage',
  persist: true,
  state: (): GalgameStorePersist => ({
    page: '1',
    limit: '24',
    sortOrder: 'desc'
  }),
  actions: {}
})
