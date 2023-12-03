import type { TopicReply } from '@/api'

interface ReplyDraft {
  tid: number
  toUserName: string
  toUid: number
  content: string
  tags: string[]
  toFloor: number
}

interface ReplyRequest {
  page: number
  limit: number
  sortField: string
  sortOrder: 'asc' | 'desc'
}

interface ReplyRewrite {
  tid: number
  rid: number
  content: string
  tags: string[]
  edited: number
}

interface ReplyRewriteTemp {
  rid: number
  content: string
  tags: string[]
  edited: number
}

export interface ReplyStoreTemp {
  textCount: number
  // Whether it's being edited
  isEdit: boolean
  // Whether to scroll to the top
  isScrollToTop: boolean
  // Whether to continue loading after it's done
  isLoading: boolean
  // Reply ID to scroll to
  scrollToReplyId: number

  isReplyRewriting: boolean

  replyRequest: ReplyRequest
  replyRewrite: ReplyRewrite
  tempReply: TopicReply
  tempReplyRewrite: ReplyRewriteTemp
}

export interface ReplyStorePersist {
  replyPanelWidth: number

  isSaveReply: boolean
  isShowHotKeywords: boolean

  editorHeight: number
  textCount: number

  replyDraft: ReplyDraft
}
