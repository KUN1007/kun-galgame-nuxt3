type TopicSortFieldRanking =
  | 'popularity'
  | 'views'
  | 'upvotes_count'
  | 'likes_count'
  | 'replies_count'
  | 'comments'

type UserSortFieldRanking =
  | 'moemoepoint'
  | 'upvote'
  | 'like'
  | 'topic_count'
  | 'reply_count'
  | 'comment_count'

interface Topic {
  index: number
  icon: string
  name: string
  sortField: TopicSortFieldRanking
}

interface User {
  index: number
  icon: string
  name: string
  sortField: UserSortFieldRanking
}

export const topicSortItem: Topic[] = [
  {
    index: 1,
    icon: 'bi:fire',
    name: 'popularity',
    sortField: 'popularity',
  },
  {
    index: 2,
    icon: 'bi:rocket',
    name: 'upvote',
    sortField: 'upvotes_count',
  },
  {
    index: 3,
    icon: 'ic:outline-remove-red-eye',
    name: 'views',
    sortField: 'views',
  },
  {
    index: 4,
    icon: 'line-md:thumbs-up-twotone',
    name: 'likes',
    sortField: 'likes_count',
  },
  {
    index: 5,
    icon: 'ri:reply-line',
    name: 'replies',
    sortField: 'replies_count',
  },
  {
    index: 6,
    icon: 'fa-regular:comment-dots',
    name: 'comments',
    sortField: 'comments',
  },
]

export const userSortItem: User[] = [
  {
    index: 1,
    icon: 'line-md:star-alt-twotone',
    name: 'moemoepoint',
    sortField: 'moemoepoint',
  },
  {
    index: 2,
    icon: 'bi:rocket',
    name: 'upvote',
    sortField: 'upvote',
  },
  {
    index: 3,
    icon: 'line-md:thumbs-up-twotone',
    name: 'like',
    sortField: 'like',
  },
  {
    index: 4,
    icon: 'line-md:text-box',
    name: 'topicCount',
    sortField: 'topic_count',
  },
  {
    index: 5,
    icon: 'ri:reply-line',
    name: 'replyCount',
    sortField: 'reply_count',
  },
  {
    index: 6,
    icon: 'fa-regular:comment-dots',
    name: 'commentCount',
    sortField: 'comment_count',
  },
]

export const userIconMap: Record<string, string> = {
  moemoepoint: 'line-md:star-alt-twotone',
  upvote: 'bi:rocket',
  like: 'line-md:thumbs-up-twotone',
  topic_count: 'line-md:text-box',
  reply_count: 'ri:reply-line',
  comment_count: 'fa-regular:comment-dots',
}

export const topicIconMap: Record<string, string> = {
  popularity: 'bi:fire',
  upvotes_count: 'bi:rocket',
  views: 'ic:outline-remove-red-eye',
  likes_count: 'line-md:thumbs-up-twotone',
  replies_count: 'ri:reply-line',
  comments: 'fa-regular:comment-dots',
}
