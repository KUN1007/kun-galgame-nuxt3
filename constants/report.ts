import type { KunSelectOption } from '~/components/kun/select/type'

export const kunReportOptions: KunSelectOption[] = [
  { value: 'topic', label: '话题' },
  { value: 'reply', label: '回复' },
  { value: 'comment', label: '评论' },
  { value: 'user', label: '用户' },
  { value: 'galgame', label: 'Galgame' },
  { value: 'galgameComment', label: 'Galgame 评论' }
]

export const KUN_REPORT_SECTION_MAP: Record<string, string> = {
  topic: '话题',
  reply: '回复',
  comment: '评论',
  user: '用户',
  galgame: 'Galgame',
  galgameComment: 'Galgame 评论'
}

export const reportSection = [
  'topic',
  'reply',
  'comment',
  'user',
  'galgame',
  'galgameComment'
] as const
