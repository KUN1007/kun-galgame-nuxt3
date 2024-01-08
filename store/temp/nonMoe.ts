import type { NonMoeLogRequestData } from '~/types/api/non-moe'

export const useTempNonMoeStore = defineStore({
  id: 'tempNonMoe',
  persist: false,
  state: (): NonMoeLogRequestData => ({
    page: '1',
    limit: '30',
    sortOrder: 'desc',
  }),
  getters: {},
  actions: {},
})
