interface Sort {
  index: number
  icon: string
  name: string
  field: string
}

export const sortItem: Sort[] = [
  {
    index: 1,
    icon: 'ic:outline-remove-red-eye',
    name: 'view',
    field: 'views',
  },
  {
    index: 2,
    icon: 'line-md:thumbs-up-twotone',
    name: 'like',
    field: 'likes_count',
  },
  {
    index: 3,
    icon: 'eos-icons:hourglass',
    name: 'time',
    field: 'time',
  },
]
