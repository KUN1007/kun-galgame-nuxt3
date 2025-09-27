import type { TopicReply } from '~/types/api/topic-reply'

interface ReplyDraft {
  targetUserId: number
  targetUserName: string
  targetFloor: number
  content: string
}

export interface ReplyRewriteData {
  id: number
  mainContent: string
  targets: {
    targetReplyId: number
    targetFloor: number
    targetUserName: string
    content: string
  }[]
}

export interface SuccessfulReplyEvent {
  data: TopicReply
  type: 'created' | 'updated' | 'deleted'
}

export interface ReplyStoreTemp {
  isEdit: boolean
  isScrollToTop: boolean
  scrollToReplyId: number
  isReplyRewriting: boolean
  replyRewrite: ReplyRewriteData | null
  lastSuccessfulReply: SuccessfulReplyEvent | null
}

export interface ReplyTargetDraft {
  targetReplyId: number
  targetFloor: number
  targetUserName: string
  content: string
}

export interface ReplyStorePersist {
  mode: 'preview' | 'source'
  replyDraft: {
    targets: ReplyTargetDraft[]
    mainContent: string
  }
}
