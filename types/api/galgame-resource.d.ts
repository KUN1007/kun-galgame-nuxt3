export interface GalgameResource {
  id: number
  galgameId: number
  user: KunUser
  type: string
  language: string
  platform: string
  size: string
  status: number
  likeCount: number
  isLike: boolean
  created: Date | string
}

export interface GalgameResourceDetails extends GalgameResource {
  user: KunUser
  link: string[]
  code: string
  password: string
  note: string
}
