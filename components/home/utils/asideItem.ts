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
    icon: 'lucide:arrow-big-up-dash',
    router: '/update-log'
  },
  {
    index: 2,
    name: 'balance',
    icon: 'lucide:circle-dollar-sign',
    router: '/balance'
  },
  {
    index: 3,
    name: 'ranking',
    icon: 'lucide:align-end-horizontal',
    router: '/ranking'
  },
  { index: 4, name: 'bylaw', icon: 'lucide:file-text', router: '/bylaw' },
  {
    index: 5,
    name: 'contact',
    icon: 'lucide:contact-round',
    router: '/contact'
  },
  {
    index: 6,
    name: 'nonMoe',
    icon: 'lucide:ban',
    router: '/non-moe'
  }
]
