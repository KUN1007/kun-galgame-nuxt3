import type { UserAttributes } from './user'

interface TopicAttributes {
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

  popularity: number
  views: number
  upvote_time: number

  upvotes_count: number
  replies_count: number
  likes_count: number
  share_count: number
  dislikes_count: number

  upvotes: number[]
  replies: number[]
  likes: number[]
  share: number[]
  comments: number
  dislikes: number[]

  status: number
  edited: number

  user: UserAttributes[]
}
