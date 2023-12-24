import type { TechniqueStoreTemp } from '~/store/types/technique'

export const useTempTechniqueStore = defineStore({
  id: 'tempTechnique',
  persist: false,
  state: (): TechniqueStoreTemp => ({
    page: 1,
    limit: 10,
    sortField: 'time',
    sortOrder: 'desc',
  }),
  actions: {
    resetPageStatus() {
      this.page = 1
      this.limit = 10
    },
  },
})
