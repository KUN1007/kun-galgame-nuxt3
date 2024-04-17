export interface GalgameComment {
  gcid: number
  gid: number
  time: Date
  content: string
  likes: {
    count: number
    isLiked: boolean
  }

  user: KunUser
  toUser: Omit<KunUser, 'avatar'> | 0
}
