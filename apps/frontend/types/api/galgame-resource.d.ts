export interface GalgameResource {
  gid: number
  grid: number
  uid: number
  type: string
  language: string
  platform: string
  size: string
  time: number
  status: number
  likes: number[]
}

export interface GalgameResourceDetails extends GalgameResource {
  user: KunUser
  link: string[]
  code: string
  password: string
  note: string
}
