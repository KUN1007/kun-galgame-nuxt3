export interface TopicComment {
  replyId: number
  targetUserId: number
  targetUsername: string
  content: string

  isShowPanel: boolean
}
