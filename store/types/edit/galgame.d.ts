import type { KunLanguage } from '~/types/i18n'

export interface GalgameStorePersist {
  vndbId: string
  name: KunLanguage
  introduction: KunLanguage
  aliases: string[]
}
