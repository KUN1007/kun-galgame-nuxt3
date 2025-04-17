export type TopicType = 'publish' | 'like' | 'upvote' | 'favorite'
export type GalgameType = 'publish' | 'like' | 'favorite' | 'contribute'
export type GalgameResourceType = 'valid' | 'invalid' | 'like'

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

  reply: number
  comment: number

  topic: number
  likeTopic: number
  upvoteTopic: number
  favoriteTopic: number

  galgame: number
  likeGalgame: number
  favoriteGalgame: number
  contributeGalgame: number

  galgameResourceValid: number
  galgameResourceInvalid: number

  dailyTopicCount: number
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

export interface UserGalgame {
  gid: number
  name: KunLanguage
  time: number
}

export interface UserGalgameResource {
  gid: number
  name: KunLanguage
  platform: string
  status: number
  time: number
}

export interface UserGetGalgameRequestData {
  page: string
  limit: string
  type: GalgameType
}

export interface UserGetGalgameResourceRequestData {
  page: string
  limit: string
  type: GalgameResourceType
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
  time: Date | string
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
}
