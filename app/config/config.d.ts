export interface KunSiteDomain {
  main: string
  imageBed: string
  storage: string
  telegram_group: string
  patch: string
  backup: string
  sticker: string
  nav: string
  doc: string
}

export interface KunSiteAuthor {
  name: string
  url: string
}

export interface KunSiteOpenGraph {
  title: string
  description: string
  image: string
  url: string
}

export interface KunSiteCreator {
  name: string
  mention: string
  url: string
}

export interface KunSiteImage {
  url: string
  fullUrl: string
  width: number
  height: number
  alt: string
}

export interface KunSiteConfig {
  name: string
  title: string
  titleShort: string
  titleTemplate: string
  description: string
  keywords: string[]
  canonical: string
  themeColor: string
  github: string
  authorGitHub: string
  author: KunSiteAuthor[]
  creator: KunSiteCreator
  publisher: KunSiteCreator
  domain: KunSiteDomain
  og: KunSiteOpenGraph
  images: KunSiteImage[]
}
