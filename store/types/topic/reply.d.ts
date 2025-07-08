import type { TopicReply } from '~/types/api/topic-reply'

interface ReplyDraft {
  targetUserId: number
  targetUserName: string
  targetFloor: number
  content: string
}

export interface ReplyStoreTemp {
  isEdit: boolean
  isScrollToTop: boolean
  scrollToReplyId: number
  isReplyRewriting: boolean

  replyRewrite: TopicReply[]
  tempReply: TopicReply[]
}

export interface ReplyStorePersist {
  mode: 'preview' | 'code'

  replyDraft: ReplyDraft
}
