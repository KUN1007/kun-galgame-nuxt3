export interface Hamburger {
  index: number
  icon: string
  name: string
  router: string
}

export const hamburgerItem: Hamburger[] = [
  {
    index: 1,
    name: 'pool',
    icon: 'lucide:square-library',
    router: '/pool'
  },
  {
    index: 2,
    name: 'create',
    icon: 'lucide:pencil',
    router: '/edit'
  },
  {
    index: 3,
    name: 'technique',
    icon: 'lucide:code-xml',
    router: '/technique'
  },
  {
    index: 4,
    name: 'about',
    icon: 'lucide:info',
    router: '/kungalgame'
  },
  { index: 5, name: 'join', icon: 'ph:telegram-logo', router: '/contact' },
  {
    index: 6,
    name: 'ranking',
    icon: 'lucide:align-end-horizontal',
    router: '/ranking'
  },
  {
    index: 7,
    name: 'update',
    icon: 'lucide:arrow-big-up-dash',
    router: '/update-log'
  },
  { index: 8, name: 'bylaw', icon: 'lucide:ruler', router: '/bylaw' },
  {
    index: 9,
    name: 'balance',
    icon: 'lucide:circle-dollar-sign',
    router: '/balance'
  },
  {
    index: 10,
    name: 'nonMoe',
    icon: 'lucide:ban',
    router: '/non-moe'
  },
  {
    index: 11,
    name: 'thanks',
    icon: 'lucide:heart-handshake',
    router: '/thanks-list'
  },
  {
    index: 12,
    name: 'donate',
    icon: 'lucide:hand-heart',
    router: '/donate'
  }
]
