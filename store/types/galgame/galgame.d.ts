import type { KunLanguageFront } from '~/types/i18n'

export interface GalgameStorePersist {
  vndb_id: number
  name: KunLanguageFront
  banner: string
  introduction: KunLanguageFront
  platform: string[]

  official: string
}
