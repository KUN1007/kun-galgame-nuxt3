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
  daily_topic_count: number

  topic: number[]
  reply: number[]
  comment: number[]
  likeTopic: number[]
  upvoteTopic: number[]
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
  uid: number
  email: string
  code: string
}

export interface UserUpdatePasswordRequestData {
  uid: number
  oldPassword: string
  newPassword: string
}

export interface UserTopic {
  tid: number
  title: string
  time: number
}

export interface UserGetUserTopicRequestData {
  uid: number
  tidArray: number[]
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

export interface UserResetPasswordByEmailRequestData {
  email: string
  code: string
  newPassword: string
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

export interface VerificationCodeMailRequestData {
  name: string
  email: string
}

export type UserInfoResponseData = UserInfo

export type UserUpdateAvatarResponseData = {
  avatar: string
  avatarMin: string
}

export type UserUpdateBioResponseData = {}

export type UserGetUserEmailResponseData = {
  email: string
}

export type UserGetEmailRestCodeResponseData = {}

export type UserUpdateEmailResponseData = {}

export type UserUpdatePasswordResponseData = {}

export type UserGetUserTopicResponseData = UserTopic[]

export type UserGetUserReplyResponseData = UserReply[]

export type UserGetUserCommentResponseData = UserComment[]

export type UserResetPasswordByEmailResponseData = {}

export type LoginResponseData = {
  uid: number
  name: string
  avatar: string
  moemoepoint: number
  roles: number
  token: string
}

export type RefreshTokenResponseData = {
  token: string
}
