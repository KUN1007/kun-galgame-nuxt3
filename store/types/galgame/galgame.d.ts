import type { KunLanguage } from '~/types/i18n'

export interface GalgameStorePersist {
  vndb_id: number
  name: KunLanguage
  banner: string
  introduction: KunLanguage
  platform: string[]

  official: string
}
