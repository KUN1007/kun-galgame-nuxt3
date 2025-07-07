import type { GalgameCard } from '~/types/api/galgame'

export interface UserInfo {
  id: number
  name: string
  avatar: string
  role: number
  status: number
  moemoepoint: number
  bio: string
  created: Date | string

  upvote: number
  like: number
  dislike: number
  favorite: number

  replyCreated: number
  commentCreated: number
  topic: number

  galgame: number
  galgameComment: number
  galgamePr: number
  galgameLink: number
  contributeGalgame: number

  galgameResource: number

  dailyTopicCount: number
  dailyGalgameCount: number
}

export interface UserTopic {
  id: number
  title: string
  created: Date | string
}

export type UserGalgame = GalgameCard

export interface UserGalgameResource {
  galgameId: number
  galgameName: KunLanguage
  platform: string
  status: number
  created: Date | string
}

export interface UserReply {
  topicId: number
  content: string
  created: Date | string
}

export interface UserGetUserReplyRequestData {
  uid: number
  ridArray: number[]
}

export interface UserComment {
  topicId: number
  content: string
  created: Date | string
}

export interface UserGetUserCommentRequestData {
  uid: number
  cidArray: number[]
}

export type UserUpdateAvatarResponseData = {
  avatar: string
  avatarMin: string
}

export type UserGetUserEmailResponseData = {
  email: string
}

export type LoginResponseData = {
  id: number
  name: string
  avatar: string
  moemoepoint: number
  role: number
}
