import type { KunTabItem } from '~/components/kun/tab/type'

export type RankingTopicSortField =
  | 'view'
  | 'upvote'
  | 'like'
  | 'favorite'
  | 'reply'
  | 'comment'

export type RankingGalgameSortField = 'view' | 'like' | 'favorite' | 'resource'

export type RankingUserSortField =
  | 'moemoepoint'
  | 'follower_relation'
  | 'topic'
  | 'reply_created'
  | 'comment_created'
  | 'galgame'
  | 'galgame_resource'

export interface RankingItem {
  index: number
  icon: string
  name: string
  label: string
}

export interface RankingTopic extends RankingItem {
  sortField: RankingTopicSortField
}

export interface RankingGalgame extends RankingItem {
  sortField: RankingGalgameSortField
}

export interface RankingUser extends RankingItem {
  sortField: RankingUserSortField
}

export const topicSortItem: RankingTopic[] = [
  {
    index: 1,
    icon: 'lucide:eye',
    name: 'view',
    sortField: 'view',
    label: '浏览数'
  },
  {
    index: 2,
    icon: 'carbon:reply',
    name: 'reply',
    sortField: 'reply',
    label: '回复数'
  },
  {
    index: 3,
    icon: 'uil:comment-dots',
    name: 'comment',
    sortField: 'comment',
    label: '评论数'
  },
  {
    index: 4,
    icon: 'lucide:thumbs-up',
    name: 'like',
    sortField: 'like',
    label: '点赞数'
  },
  {
    index: 5,
    icon: 'lucide:sparkles',
    name: 'upvote',
    sortField: 'upvote',
    label: '被推数'
  },
  {
    index: 6,
    icon: 'lucide:heart',
    name: 'favorite',
    sortField: 'favorite',
    label: '收藏数'
  }
]

export const galgameSortItem: RankingGalgame[] = [
  {
    index: 1,
    icon: 'lucide:eye',
    name: 'view',
    sortField: 'view',
    label: '浏览数'
  },
  {
    index: 2,
    icon: 'lucide:thumbs-up',
    name: 'like',
    sortField: 'like',
    label: '点赞数'
  },
  {
    index: 3,
    icon: 'lucide:heart',
    name: 'favorite',
    sortField: 'favorite',
    label: '收藏数'
  },
  {
    index: 4,
    icon: 'lucide:box',
    name: 'resource',
    sortField: 'resource',
    label: '资源数'
  }
]

export const userSortItem: RankingUser[] = [
  {
    index: 1,
    icon: 'lucide:lollipop',
    name: 'moemoepoint',
    sortField: 'moemoepoint',
    label: '萌萌点'
  },
  // TODO:
  // {
  //   index: 2,
  //   icon: 'lucide:sparkles',
  //   name: 'upvote',
  //   sortField: 'upvote'
  // },
  // {
  //   index: 3,
  //   icon: 'lucide:thumbs-up',
  //   name: 'like',
  //   sortField: 'like'
  // },
  {
    index: 2,
    icon: 'lucide:square-gantt-chart',
    name: 'topic',
    sortField: 'topic',
    label: '话题数'
  },
  {
    index: 3,
    icon: 'carbon:reply',
    name: 'reply_created',
    sortField: 'reply_created',
    label: '回复数'
  },
  {
    index: 4,
    icon: 'uil:comment-dots',
    name: 'comment_created',
    sortField: 'comment_created',
    label: '评论数'
  },
  {
    index: 5,
    icon: 'lucide:gamepad-2',
    name: 'galgame',
    sortField: 'galgame',
    label: 'Galgame 数'
  },
  {
    index: 6,
    icon: 'lucide:box',
    name: 'galgame_resource',
    sortField: 'galgame_resource',
    label: 'Galgame 资源'
  }
]

export const rankingPageTabs: KunTabItem[] = [
  {
    textValue: '话题',
    value: 'topic',
    href: '/ranking/topic'
  },
  {
    textValue: 'Galgame',
    value: 'galgame',
    href: '/ranking/galgame'
  },
  {
    textValue: '用户',
    value: 'user',
    href: '/ranking/user'
  }
]
