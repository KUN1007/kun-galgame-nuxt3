export interface GalgameRSS {
  id: number
  name: string
  banner: string
  user: KunUser

  created: Date | string
  description: string
}

export interface TopicRSS {
  id: number
  name: string
  user: KunUser

  created: Date | string
  description: string
}
