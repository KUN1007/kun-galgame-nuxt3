import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

interface Store {
  resources: GalgameResourceStoreTemp[]
}

export const useTempGalgameResourceStore = defineStore({
  id: 'KUNGalgameResource',
  persist: false,
  state: (): Store => ({
    resources: []
  }),
  actions: {}
})
