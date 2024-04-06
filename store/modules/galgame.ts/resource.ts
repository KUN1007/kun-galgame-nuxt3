import type { GalgameResourceStorePersist } from '~/store/types/galgame/resource'

interface Store {
  resources: GalgameResourceStorePersist[]
}

export const usePersistGalgameResourceStore = defineStore({
  id: 'KUNGalgameResource',
  persist: true,
  state: (): Store => ({
    resources: []
  }),
  actions: {}
})
