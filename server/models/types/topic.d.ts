import type { UserAttributes } from './user'

export interface TopicAttributes {
  tid: number
  title: string
  content: string
  uid: number
  avatar: string
  name: string
  tags: string[]
  category: string[]
  section: string[]
  time: number

  views: number
  upvote_time: number

  upvotes: number[]
  replies: number[]
  likes: number[]
  share: number[]
  comments: number
  dislikes: number[]
  favorites: number[]

  status: number
  edited: number

  user: UserAttributes[]

  created: Date
  updated: Date
}
