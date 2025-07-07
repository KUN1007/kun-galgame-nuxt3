import type { HomeTopic, HomeGalgame } from './home'

export type TopicCard = HomeTopic

export interface TopicAside {
  title: string
  tid: number
}

export interface EditCreateTopicRequestData {
  title: string
  content: string
  time: string
  tags: string[]
  category: string[]
  section: string[]
}

export interface EditUpdateTopicRequestData {
  tid: number
  title: string
  content: string
  tags: string[]
  category: string[]
  section: string[]
  edited: string
}

export interface TopicDetail {
  id: number
  title: string
  view: number
  status: number
  category: string
  section: string[]
  tag: string[]
  user: KunUser & { moemoepoint: number }

  likeCount: number
  isLiked: boolean
  dislikeCount: number
  isDisliked: boolean
  favoriteCount: number
  isFavorited: boolean
  upvoteCount: number
  isUpvoted: boolean

  contentHtml: string
  contentMarkdown: string
  statusUpdateTime: Date | string
  upvoteTime: Date | string | null
  edited: Date | string | null
  created: Date | string
}
