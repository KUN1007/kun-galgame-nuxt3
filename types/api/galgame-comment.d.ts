export interface GalgameComment {
  gcid: number
  gid: number
  time: Date
  content: string

  user: KunUser
  toUser: Omit<KunUser, 'avatar'> | 0
}
