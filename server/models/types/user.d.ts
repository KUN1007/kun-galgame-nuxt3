// 用户
export interface UserAttributes {
  uid: number
  name: string
  email: string
  password: string
  ip: string
  avatar: string
  roles: number
  status: number
  time: number
  moemoepoint: number
  bio: string
  upvote: number
  like: number
  dislike: number
  daily_topic_count: number

  friend_count: number
  followed_count: number
  follower_count: number
  topic_count: number
  reply_count: number
  comment_count: number

  friend: number[]
  followed: number[]
  follower: number[]
  topic: number[]
  reply: number[]
  comment: number[]
  like_topic: number[]
  dislike_topic: number[]
  upvote_topic: number[]
  reply_topic: number[]
}
