import type {
  KunGalgameResourceTypeOptions,
  KunGalgameResourceLanguageOptions,
  KunGalgameResourcePlatformOptions
} from '~/constants/galgame'

export interface GalgameStoreTemp {
  page: number
  limit: number
  type: KunGalgameResourceTypeOptions
  language: KunGalgameResourceLanguageOptions
  platform: KunGalgameResourcePlatformOptions
  sortField: 'time' | 'created' | 'view'
  sortOrder: KunOrder
}
