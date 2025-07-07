export interface GalgameComment {
  id: number
  galgameId: number
  created: number
  content: string
  likeCount: number
  isLike: boolean

  user: KunUser
  targetUser?: KunUser
}
