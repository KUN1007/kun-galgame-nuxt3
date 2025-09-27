export interface GalgameStorePersist {
  vndbId: string
  name: KunLanguage
  introduction: KunLanguage
  contentLimit: string
  aliases: string[]
}

export interface GalgameEditStoreTemp {
  id: number
  vndbId: string
  name: KunLanguage
  introduction: KunLanguage
  contentLimit: string
  alias: string[]
}
