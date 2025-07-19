import type { KunTabItem } from '~/components/kun/tab/type'

export const activityPageTabs: KunTabItem[] = [
  {
    textValue: '全部',
    value: 'all'
  },
  {
    textValue: '被推',
    value: 'upvoted'
  },
  {
    textValue: '回复',
    value: 'replied'
  },
  {
    textValue: '评论',
    value: 'commented'
  },
  {
    textValue: '最佳答案',
    value: 'solution'
  },
  {
    textValue: '更新请求',
    value: 'requested'
  }
]

export const KUN_ALLOWED_ACTIVITY_TYPE = [
  'all',
  'upvoted',
  'replied',
  'commented',
  'solution',
  'requested'
] as const

export const KUN_ACTIVITY_ICON_MAP: Record<string, string> = {
  upvoted: 'lucide:sparkles',
  replied: 'carbon:reply',
  commented: 'uil:comment-dots',
  requested: 'lucide:git-pull-request-arrow',
  solution: 'lucide:bookmark-check'
}
