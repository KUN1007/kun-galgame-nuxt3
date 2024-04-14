import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

interface Store {
  rewriteDraft: GalgameStoreTemp[]
}

export const useTempGalgameRewriteStore = defineStore({
  id: 'tempGalgameRewrite',
  persist: false,
  state: (): Store => ({
    rewriteDraft: []
  })
})
