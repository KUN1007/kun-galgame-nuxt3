export interface GalgameResource {
  id: number
  galgameId: number
  user: KunUser
  type: string
  language: string
  platform: string
  size: string
  status: number
  download: number
  likeCount: number
  isLiked: boolean
  linkDomain: string
  created: Date | string
}

export interface GalgameResourceDetails extends GalgameResource {
  user: KunUser
  link: string[]
  code: string
  password: string
  note: string
}

export interface GalgameResourceCard extends GalgameResource {
  galgameName: KunLanguage
}
