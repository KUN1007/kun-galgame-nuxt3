interface Category {
  index: number
  icon: string
  name: string
}

interface Sort {
  index: number
  icon: string
  name: string
  sortField: string
}

export const categoryItem: Category[] = [
  {
    index: 1,
    icon: 'icon-park-outline:game',
    name: 'galgame'
  },
  {
    index: 2,
    icon: 'mingcute:tool-line',
    name: 'technique'
  },
  {
    index: 3,
    icon: 'basil:other-1-outline',
    name: 'others'
  }
]

export const sortItem: Sort[] = [
  {
    index: 1,
    icon: 'line-md:arrows-vertical',
    name: 'updated',
    sortField: 'updated'
  },
  {
    index: 2,
    icon: 'eos-icons:hourglass',
    name: 'time',
    sortField: 'time'
  },
  {
    index: 3,
    icon: 'bi:fire',
    name: 'popularity',
    sortField: 'popularity'
  },
  {
    index: 4,
    icon: 'ic:outline-remove-red-eye',
    name: 'views',
    sortField: 'views'
  },
  {
    index: 5,
    icon: 'line-md:thumbs-up-twotone',
    name: 'likes',
    sortField: 'likes_count'
  },
  {
    index: 6,
    icon: 'ri:reply-line',
    name: 'replies',
    sortField: 'replies_count'
  },
  {
    index: 7,
    icon: 'fa-regular:comment-dots',
    name: 'comments',
    sortField: 'comments'
  }
]
