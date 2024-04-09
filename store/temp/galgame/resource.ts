import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

interface Store {
  resources: GalgameResourceStoreTemp[]
  isShowPublish: boolean
}

export const useTempGalgameResourceStore = defineStore({
  id: 'KUNGalgameResource',
  persist: false,
  state: (): Store => ({
    resources: [],
    isShowPublish: false
  }),
  actions: {}
})
