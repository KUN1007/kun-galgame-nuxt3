type TopicSortFieldRanking =
  | 'views'
  | 'upvotes'
  | 'likes'
  | 'replies'
  | 'comments'

type UserSortFieldRanking =
  | 'moemoepoint'
  | 'upvote'
  | 'like'
  | 'topic'
  | 'reply'
  | 'comment'

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
    icon: 'lucide:mouse-pointer-click',
    name: 'views',
    sortField: 'views'
  },
  {
    index: 2,
    icon: 'lucide:reply',
    name: 'replies',
    sortField: 'replies'
  },
  {
    index: 3,
    icon: 'uil:comment-dots',
    name: 'comments',
    sortField: 'comments'
  },
  {
    index: 4,
    icon: 'lucide:thumbs-up',
    name: 'likes',
    sortField: 'likes'
  },
  {
    index: 5,
    icon: 'lucide:sparkles',
    name: 'upvote',
    sortField: 'upvotes'
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
    icon: 'lucide:sparkles',
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
    name: 'topic',
    sortField: 'topic'
  },
  {
    index: 5,
    icon: 'lucide:reply',
    name: 'reply',
    sortField: 'reply'
  },
  {
    index: 6,
    icon: 'uil:comment-dots',
    name: 'comment',
    sortField: 'comment'
  }
]

export const userIconMap: Record<string, string> = {
  moemoepoint: 'lucide:lollipop',
  upvote: 'lucide:sparkles',
  like: 'lucide:thumbs-up',
  topic: 'lucide:square-gantt-chart',
  reply: 'lucide:reply',
  comment: 'uil:comment-dots'
}

export const topicIconMap: Record<string, string> = {
  upvotes: 'lucide:sparkles',
  views: 'lucide:mouse-pointer-click',
  likes: 'lucide:thumbs-up',
  replies: 'lucide:reply',
  comments: 'uil:comment-dots'
}
