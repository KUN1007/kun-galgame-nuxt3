export interface GalgameStorePersist {
  vndbId: string
  name: KunLanguage
  introduction: KunLanguage
  aliases: string[]
}

export interface GalgameStoreTemp {
  gid: number
  name: KunLanguage
  introduction: KunLanguage
  series: number[]
  alias: string[]
  official: string[]
  engine: string[]
  tags: string[]
}
