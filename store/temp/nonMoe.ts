import type { getNonMoeLogsApi } from '~/api'

export const useTempNonMoeStore = defineStore({
  id: 'tempNonMoe',
  persist: false,
  state: (): NonMoeLogRequestData => ({
    page: 1,
    limit: 30,
    sortOrder: 'desc',
  }),
  getters: {},
  actions: {},
})
