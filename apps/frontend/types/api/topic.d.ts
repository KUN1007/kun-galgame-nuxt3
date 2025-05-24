import type { HomeTopic, HomeGalgame } from './home'

export type SortField =
  | 'updated'
  | 'time'
  | 'views'
  | 'upvotes'
  | 'likes'
  | 'replies'
  | 'comments'

export type SortFieldTopic = 'views' | 'created'

export type TopicCard = HomeTopic

export interface TopicCardRequestData {
  page: string
  limit: string
  sortField: string
  sortOrder: string
  category: string
}

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

export interface TopicUserInfo {
  uid: number
  name: string
  avatar: string
  moemoepoint: number
}

export interface TopicToUserInfo {
  uid: number
  name: string
}

export interface TopicDetail {
  tid: number
  title: string
  views: number
  likes: {
    count: number
    isLiked: boolean
  }
  dislikes: {
    count: number
    isDisliked: boolean
  }
  favorites: {
    count: number
    isFavorite: boolean
  }
  time: number
  content: string
  markdown: string
  upvotes: {
    count: number
    isUpvoted: boolean
  }
  tags: string[]
  edited: number
  user: TopicUserInfo
  replies: number[]
  status: number
  share: number[]
  category: string[]
  section: string[]
  upvoteTime: number
}
