import {
  TypeOptions,
  LanguageOptions,
  PlatformOptions
} from '~/components/galgame/utils/options'

export interface GalgameStoreTemp {
  page: number
  limit: number
  type: TypeOptions
  language: LanguageOptions
  platform: PlatformOptions
  sortField: 'time' | 'views'
  sortOrder: KunOrder
}
