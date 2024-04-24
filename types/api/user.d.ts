export type TopicType = 'publish' | 'like' | 'upvote' | 'favorite'

export interface UserInfo {
  uid: number
  name: string
  avatar: string
  roles: number
  status: number
  time: number
  moemoepoint: number
  bio: string
  upvote: number
  like: number
  dislike: number
  dailyTopicCount: number

  topic: number
  reply: number
  comment: number
  likeTopic: number
  upvoteTopic: number
  favoriteTopic: number

  galgame: number
  contributeGalgame: number
  dailyGalgameCount: number
}

export interface UserUpdateAvatarRequestData {
  uid: number
  avatar: FormData
}

export interface UserUpdateBioRequestData {
  uid: number
  bio: string
}

export interface UserUpdateEmailRequestData {
  email: string
  code: string
}

export interface UserUpdatePasswordRequestData {
  oldPassword: string
  newPassword: string
}

export interface UserTopic {
  tid: number
  title: string
  time: number
}

export interface UserGetTopicRequestData {
  page: string
  limit: string
  type: TopicType
}

export interface UserReply {
  tid: number
  content: string
  time: number
}

export interface UserGetUserReplyRequestData {
  uid: number
  ridArray: number[]
}

export interface UserComment {
  tid: number
  content: string
}

export interface UserGetUserCommentRequestData {
  uid: number
  cidArray: number[]
}

export interface LoginRequestData {
  name: string
  password: string
}

export interface RegisterRequestData {
  name: string
  email: string
  password: string
  code: string
}

export type UserUpdateAvatarResponseData = {
  avatar: string
  avatarMin: string
}

export type UserGetUserEmailResponseData = {
  email: string
}

export type LoginResponseData = {
  uid: number
  name: string
  avatar: string
  moemoepoint: number
  roles: number
  token: string
}
