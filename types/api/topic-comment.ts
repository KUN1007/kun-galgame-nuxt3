export interface TopicComment {
  id: number
  replyId: number
  topicId: number
  user: KunUser
  targetUser: KunUser
  content: string
  isLiked: boolean
  likeCount: number
  created: Date | string
}
