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
  daily_galgame_count: number
  daily_image_count: number
  daily_check_in: number

  friend: number[]
  followed: number[]
  follower: number[]
  reply: number[]
  comment: number[]

  topic: number[]
  like_topic: number[]
  dislike_topic: number[]
  upvote_topic: number[]
  favorite_topic: number[]

  galgame: number[]
  like_galgame: number[]
  favorite_galgame: number[]
  contribute_galgame: number[]

  galgame_resource: number[]
  like_galgame_resource: number[]

  created: Date
  updated: Date
}
