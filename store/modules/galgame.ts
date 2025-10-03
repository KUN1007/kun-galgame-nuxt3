import { defineStore } from 'pinia'
import type { ProviderKey } from '~/constants/galgameResource'
import type { GalgameAdvancedFilterPersist } from '~/store/types/galgame/advancedFilter'

export const usePersistKUNGalgameAdvancedFilterStore = defineStore(
  'KUNGalgameAdvancedFilter',
  {
    persist: true,
    state: (): GalgameAdvancedFilterPersist => ({
      includeProviders: [],
      excludeOnlyProviders: []
    }),
    actions: {
      setIncludeProviders(providers: ProviderKey[]) {
        this.includeProviders = Array.from(new Set(providers))
      },
      setExcludeOnlyProviders(providers: ProviderKey[]) {
        this.excludeOnlyProviders = Array.from(new Set(providers))
      },
      toggleIncludeProvider(provider: ProviderKey) {
        const idx = this.includeProviders.indexOf(provider)
        if (idx === -1) this.includeProviders.push(provider)
        else this.includeProviders.splice(idx, 1)
      },
      toggleExcludeOnlyProvider(provider: ProviderKey) {
        const idx = this.excludeOnlyProviders.indexOf(provider)
        if (idx === -1) this.excludeOnlyProviders.push(provider)
        else this.excludeOnlyProviders.splice(idx, 1)
      }
    }
  }
)
