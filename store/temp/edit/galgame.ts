import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

interface Store {
  galgamePR: GalgameStoreTemp[]
}

export const useTempGalgamePRStore = defineStore({
  id: 'tempGalgamePR',
  persist: false,
  state: (): Store => ({
    galgamePR: []
  })
})
