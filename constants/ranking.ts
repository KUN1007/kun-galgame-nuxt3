import type { KunTabItem } from '~/components/kun/tab/type'

export type RankingTopicSortField =
  | 'views'
  | 'upvotes'
  | 'likes'
  | 'replies'
  | 'comments'

export type RankingUserSortField =
  | 'moemoepoint'
  | 'upvote'
  | 'like'
  | 'topic'
  | 'reply'
  | 'comment'

export interface RankingTopic {
  index: number
  icon: string
  name: string
  sortField: RankingTopicSortField
}

export interface RankingUser {
  index: number
  icon: string
  name: string
  sortField: RankingUserSortField
}

export const topicSortItem: RankingTopic[] = [
  {
    index: 1,
    icon: 'lucide:eye',
    name: 'views',
    sortField: 'views'
  },
  {
    index: 2,
    icon: 'carbon:reply',
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

export const userSortItem: RankingUser[] = [
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
    icon: 'carbon:reply',
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
  reply: 'carbon:reply',
  comment: 'uil:comment-dots'
}

export const topicIconMap: Record<string, string> = {
  upvotes: 'lucide:sparkles',
  views: 'lucide:eye',
  likes: 'lucide:thumbs-up',
  replies: 'carbon:reply',
  comments: 'uil:comment-dots'
}

export const KUN_RANKING_USER_MAP: Record<string, string> = {
  moemoepoint: '萌萌点',
  upvote: '推数',
  like: '点赞数',
  topic: '话题数',
  reply: '回复数',
  comment: '评论数'
}

export const KUN_RANKING_TOPIC_MAP: Record<string, string> = {
  upvotes: '推数',
  views: '浏览数',
  likes: '点赞数',
  replies: '回复数',
  comments: '评论数'
}

export const rankingPageTabs: KunTabItem[] = [
  {
    textValue: '话题',
    value: 'topic',
    href: '/ranking/topic'
  },
  {
    textValue: '用户',
    value: 'user',
    href: '/ranking/user'
  }
]
