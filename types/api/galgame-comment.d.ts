export interface GalgameComment {
  id: number
  galgameId: number
  created: number
  content: string
  likeCount: number
  isLiked: boolean

  user: KunUser
  targetUser: KunUser | null
}
