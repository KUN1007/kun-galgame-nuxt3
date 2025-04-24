export interface GalgameStorePersist {
  vndbId: string
  name: KunLanguage
  introduction: KunLanguage
  contentLimit: string
  series: string[]
  aliases: string[]
  official: string[]
  engine: string[]
  tags: string[]
}

export interface GalgameStoreTemp {
  gid: number
  name: KunLanguage
  introduction: KunLanguage
  contentLimit: string
  series: string[]
  alias: string[]
  official: string[]
  engine: string[]
  tags: string[]
}
