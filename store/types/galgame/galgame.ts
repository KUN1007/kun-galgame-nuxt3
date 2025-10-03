import type {
  KunGalgameResourceTypeOptions,
  KunGalgameResourceLanguageOptions,
  KunGalgameResourcePlatformOptions
} from '~/constants/galgame'
import type { ProviderKey } from '~/constants/galgameResource'

export interface GalgameStoreTemp {
  page: number
  limit: number
  type: KunGalgameResourceTypeOptions
  language: KunGalgameResourceLanguageOptions
  platform: KunGalgameResourcePlatformOptions
  sortField: 'time' | 'created' | 'view'
  sortOrder: KunOrder
  includeProviders: ProviderKey[]
  excludeOnlyProviders: ProviderKey[]
}
