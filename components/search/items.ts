import type { SearchType } from '~/types/api/search'

interface NavItem {
  i18n: string
  value: SearchType
}

export const navItems: NavItem[] = [
  {
    i18n: 'search.topic',
    value: 'topic'
  },
  {
    i18n: 'search.galgame',
    value: 'galgame'
  },
  {
    i18n: 'search.user',
    value: 'user'
  },
  {
    i18n: 'search.reply',
    value: 'reply'
  },
  {
    i18n: 'search.comment',
    value: 'comment'
  }
]
