export interface GalgameRSS {
  gid: number
  name: string
  banner: string
  user: KunUser

  time: number
  description: string
}

export interface TopicRSS {
  tid: number
  name: string
  user: KunUser

  time: number
  description: string
}
