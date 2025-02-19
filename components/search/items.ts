import type { SearchType } from '~/types/api/search'

interface NavItem {
  textValue: string
  value: SearchType
}

export const navItems: NavItem[] = [
  {
    textValue: '话题',
    value: 'topic'
  },
  {
    textValue: 'Galgame',
    value: 'galgame'
  },
  {
    textValue: '用户',
    value: 'user'
  },
  {
    textValue: '回复',
    value: 'reply'
  },
  {
    textValue: '评论',
    value: 'comment'
  }
]
