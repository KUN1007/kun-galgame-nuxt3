import type { ToolsetStoreTemp } from '~/store/types/toolset/toolset'

export const useTempToolsetStore = defineStore('tempToolset', {
  persist: false,
  state: (): ToolsetStoreTemp => ({
    page: 1,
    limit: 24,
    type: 'all',
    language: 'all',
    platform: 'all',
    version: 'all',
    sortField: 'resource_update_time',
    sortOrder: 'desc'
  }),
  actions: {}
})
