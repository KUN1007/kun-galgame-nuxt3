export interface TopicComment {
  id: number
  replyId: number
  topicId: number
  user: KunUser
  toUser: KunUser
  content: string
  isLiked: boolean
  likeCount: number
}
