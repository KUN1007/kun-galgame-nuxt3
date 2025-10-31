import type { GalgameCard } from '~/types/api/galgame'
import type { UserStore } from '~/store/types/user'

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
  topicPoll: number

  galgame: number
  galgameComment: number
  galgamePr: number
  galgameLink: number
  galgameRating: number
  contributeGalgame: number

  galgameResource: number
  galgameToolset: number
  galgameToolsetResource: number

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
  id: number
  galgameId: number
  galgameName: KunLanguage
  type: string
  language: string
  platform: string
  size: string
  link: string[]
  code: string
  password: string
  note: string
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

export interface UserFloatingCard extends KunUser {
  moemoepoint: number
  topicCount: number
  topicReplyCount: number
  topicCommentCount: number
  galgameCount: number
  galgameResourceCount: number
  galgameContributeCount: number
}

export type UserUpdateAvatarResponseData = {
  avatar: string
  avatarMin: string
}

export type UserGetUserEmailResponseData = {
  email: string
}

export type LoginResponseData = UserStore
