interface Sort {
  index: number
  icon: string
  name: string
  field: string
}

export const sortItem: Sort[] = [
  {
    index: 1,
    icon: 'lucide:mouse-pointer-click',
    name: 'view',
    field: 'views'
  },
  {
    index: 2,
    icon: 'lucide:thumbs-up',
    name: 'like',
    field: 'likes_count'
  },
  {
    index: 3,
    icon: 'lucide:calendar-heart',
    name: 'time',
    field: 'time'
  }
]
