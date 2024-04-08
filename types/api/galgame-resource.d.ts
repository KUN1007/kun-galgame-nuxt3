interface User {
  uid: number
  name: string
  avatar: string
}

export interface GalgameResource {
  gid: number
  grid: number
  type: string
  language: string
  platform: string
  size: string
  time: number
  status: number
  likes: number
}

export interface GalgameResourceDetails extends GalgameResource {
  user: User
  link: string
  code: string
  password: string
  note: string
}
