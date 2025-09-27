import type { GalgameEditStoreTemp } from '~/store/types/edit/galgame'

interface Store {
  galgamePR: GalgameEditStoreTemp[]
}

export const useTempGalgamePRStore = defineStore('tempGalgamePR', {
  persist: false,
  state: (): Store => ({
    galgamePR: []
  })
})
