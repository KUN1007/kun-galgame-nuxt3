import type { TopicReply } from '~/types/api/topic-reply'

interface ReplyDraft {
  toUid: number
  toUserName: string
  toFloor: number
  tags: string[]
  content: string
}

interface ReplyRewriteTemp {
  rid: number
  content: string
  tags: string[]
  edited: number
}

export interface ReplyStoreTemp {
  textCount: number
  isEdit: boolean
  isScrollToTop: boolean
  scrollToReplyId: number
  isReplyRewriting: boolean

  replyRewrite: TopicReply[]
  tempReply: TopicReply[]
}

export interface ReplyStorePersist {
  textCount: number

  replyDraft: ReplyDraft
}
