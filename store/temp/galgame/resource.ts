import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

interface Store {
  resources: GalgameResourceStoreTemp[]
  isShowPublish: boolean
  rewriteResourceId: number
}

export const useTempGalgameResourceStore = defineStore({
  id: 'tempGalgameResource',
  persist: false,
  state: (): Store => ({
    resources: [],
    isShowPublish: false,
    rewriteResourceId: 0
  }),
  actions: {}
})
