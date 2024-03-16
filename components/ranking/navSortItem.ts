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
    icon: 'lucide:flame',
    name: 'popularity',
    sortField: 'popularity'
  },
  {
    index: 2,
    icon: 'lucide:cherry',
    name: 'upvote',
    sortField: 'upvotes_count'
  },
  {
    index: 3,
    icon: 'lucide:mouse-pointer-click',
    name: 'views',
    sortField: 'views'
  },
  {
    index: 4,
    icon: 'lucide:thumbs-up',
    name: 'likes',
    sortField: 'likes_count'
  },
  {
    index: 5,
    icon: 'lucide:reply',
    name: 'replies',
    sortField: 'replies_count'
  },
  {
    index: 6,
    icon: 'uil:comment-dots',
    name: 'comments',
    sortField: 'comments'
  }
]

export const userSortItem: User[] = [
  {
    index: 1,
    icon: 'lucide:lollipop',
    name: 'moemoepoint',
    sortField: 'moemoepoint'
  },
  {
    index: 2,
    icon: 'lucide:cherry',
    name: 'upvote',
    sortField: 'upvote'
  },
  {
    index: 3,
    icon: 'lucide:thumbs-up',
    name: 'like',
    sortField: 'like'
  },
  {
    index: 4,
    icon: 'lucide:square-gantt-chart',
    name: 'topicCount',
    sortField: 'topic_count'
  },
  {
    index: 5,
    icon: 'lucide:reply',
    name: 'replyCount',
    sortField: 'reply_count'
  },
  {
    index: 6,
    icon: 'uil:comment-dots',
    name: 'commentCount',
    sortField: 'comment_count'
  }
]

export const userIconMap: Record<string, string> = {
  moemoepoint: 'lucide:lollipop',
  upvote: 'lucide:cherry',
  like: 'lucide:thumbs-up',
  topic_count: 'lucide:square-gantt-chart',
  reply_count: 'lucide:reply',
  comment_count: 'uil:comment-dots'
}

export const topicIconMap: Record<string, string> = {
  popularity: 'lucide:flame',
  upvotes_count: 'lucide:cherry',
  views: 'lucide:mouse-pointer-click',
  likes_count: 'lucide:thumbs-up',
  replies_count: 'lucide:reply',
  comments: 'uil:comment-dots'
}
