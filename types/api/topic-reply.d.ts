import type { TopicComment } from './topic-comment'

export interface TopicReplyTargetInfo {
  id: number
  floor: number
  user: KunUser
  contentPreview: string
  replyContentHtml: string
  replyContentMarkdown: string
}

export interface TopicReply {
  id: number
  topicId: number
  floor: number
  user: KunUser & { moemoepoint: number }
  contentHtml: string
  contentMarkdown: string

  likeCount: number
  isLiked: boolean
  dislikeCount: number
  isDisliked: boolean
  targetByCount: number

  comment: TopicComment[]
  created: Date | string
  edited: Date | string | null

  targets: TopicReplyTargetInfo[]
  isPinned: boolean
  isBestAnswer: boolean
}

export type TopicReplyDetail = Omit<TopicReply, 'comment'>
