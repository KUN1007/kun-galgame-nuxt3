export interface TopicAside {
  title: string
  tid: number
}

export interface TopicAsideOtherTagRequestData {
  tags: string[]
  tid: number
}

export interface TopicAsideMasterRequestData {
  uid: number
  tid: string
}

export interface EditCreateTopicRequestData {
  title: string
  content: string
  time: number
  tags: Array<string>
  category: Array<string>
}

export interface EditKUNGalgameTopic {
  tid: number
}

export interface EditUpdateTopicRequestData {
  tid: number
  title: string
  content: string
  tags: string[]
  category: string[]
  edited: number
}

export interface EditGetHotTagsRequestData {
  limit: number
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
  likes: number[]
  dislikes: number[]
  time: number
  content: string
  upvotes: number[]
  tags: string[]
  edited: number
  user: TopicUserInfo
  replies: number[]
  status: number
  share: number[]
  category: string[]
  popularity: number
  upvote_time: number
}

export interface TopicUpvoteTopicRequestData {
  tid: number
  to_uid: number
  time: number
}

export interface TopicLikeTopicRequestData {
  tid: number
  to_uid: number
  isPush: boolean
}

export interface TopicDislikeTopicRequestData {
  tid: number
  to_uid: number
  isPush: boolean
}

export interface TopicUpdateRequestData {
  tid: number
  uid: number
  title: string
  content: string
  tags: string[]
  category: string[]
}

export interface TopicReplyRequestData {
  tid: number
  page?: number
  limit?: number
  sortField: string
  sortOrder: string
}

export interface TopicReply {
  rid: number
  tid: number
  floor: number
  to_floor: number
  r_user: TopicUserInfo
  to_user: TopicToUserInfo
  edited: number
  content: string
  upvotes: number[]
  upvote_time: number
  likes: number[]
  dislikes: number[]
  tags: string[]
  time: number
  comment: number[]
}

export interface TopicCreateReplyRequestData {
  tid: number
  to_uid: number
  to_floor: number
  tags: string[]
  content: string
  time: number
}

export interface TopicUpvoteReplyRequestData {
  tid: number
  to_uid: number
  rid: number
  time: number
}

export interface TopicLikeReplyRequestData {
  tid: number
  to_uid: number
  rid: number
  isPush: boolean
}

export interface TopicDislikeReplyRequestData {
  tid: number
  to_uid: number
  rid: number
  isPush: boolean
}

export interface TopicUpdateReplyRequestData {
  tid: number
  rid: number
  content: string
  tags: string[]
  edited: number
}
