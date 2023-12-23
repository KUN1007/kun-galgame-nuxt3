export type SortField = 'floor' | 'likes_count' | 'comments_count'
export type SortOrder = 'asc' | 'desc'

interface Item {
  index: number
  sortField: SortField
  icon: string
  name: string
}

export const asideItem: Item[] = [
  {
    index: 1,
    sortField: 'floor',
    icon: 'line-md:arrows-vertical',
    name: 'floor',
  },
  {
    index: 2,
    sortField: 'likes_count',
    icon: 'line-md:thumbs-up-twotone',
    name: 'like',
  },
  {
    index: 3,
    sortField: 'comments_count',
    icon: 'fa-regular:comment-dots',
    name: 'comment',
  },
]

interface SortItem {
  index: number
  sortOrder: SortOrder
  icon: string
}

export const sortItem: SortItem[] = [
  {
    index: 1,
    sortOrder: 'asc',
    icon: 'tdesign:order-ascending',
  },
  {
    index: 2,
    sortOrder: 'desc',
    icon: 'tdesign:order-descending',
  },
]
