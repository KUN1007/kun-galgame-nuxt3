import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

interface Store {
  galgamePR: GalgameStoreTemp[]
}

export const useTempGalgamePRStore = defineStore('tempGalgamePR', {
  persist: false,
  state: (): Store => ({
    galgamePR: []
  })
})
