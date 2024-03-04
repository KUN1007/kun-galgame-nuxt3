interface AsideItem {
  index: number
  name: string
  icon: string
  router: string
}

export const asideItem: AsideItem[] = [
  {
    index: 1,
    name: 'update',
    icon: 'line-md:uploading-loop',
    router: '/update-log'
  },
  {
    index: 2,
    name: 'balance',
    icon: 'solar:dollar-outline',
    router: '/balance'
  },
  {
    index: 3,
    name: 'ranking',
    icon: 'solar:ranking-outline',
    router: '/ranking'
  },
  { index: 4, name: 'bylaw', icon: 'line-md:clipboard-list', router: '/bylaw' },
  {
    index: 5,
    name: 'contact',
    icon: 'fluent-mdl2:contact-list',
    router: '/contact'
  },
  {
    index: 6,
    name: 'nonMoe',
    icon: 'line-md:minus-circle',
    router: '/non-moe'
  }
]
