import type { HomeTopic, HomeGalgame } from './home'

export type TopicCard = HomeTopic

export interface TopicAside {
  title: string
  tid: number
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

  replyCount: number

  contentHtml: string
  contentMarkdown: string
  statusUpdateTime: Date | string
  upvoteTime: Date | string | null
  edited: Date | string | null
  created: Date | string
}
