import type { SortField, SortOrder } from '~/types/api/reply'

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
    icon: 'lucide:arrow-up-0-1',
    name: 'floor'
  },
  {
    index: 2,
    sortField: 'likes',
    icon: 'lucide:thumbs-up',
    name: 'like'
  },
  {
    index: 3,
    sortField: 'comments',
    icon: 'uil:comment-dots',
    name: 'comment'
  }
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
    icon: 'lucide:sort-asc'
  },
  {
    index: 2,
    sortOrder: 'desc',
    icon: 'lucide:sort-desc'
  }
]
