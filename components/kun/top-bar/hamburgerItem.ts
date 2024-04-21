export interface Hamburger {
  index: number
  icon: string
  name: string
  router: string
}

export const hamburgerItem: Hamburger[] = [
  {
    index: 1,
    name: 'galgame',
    icon: 'lucide:gamepad-2',
    router: '/galgame'
  },
  {
    index: 2,
    name: 'pool',
    icon: 'lucide:square-library',
    router: '/pool'
  },
  {
    index: 3,
    name: 'category',
    icon: 'lucide:layers-3',
    router: '/category'
  },
  {
    index: 4,
    name: 'createTopic',
    icon: 'lucide:pencil',
    router: '/edit/topic'
  },
  {
    index: 5,
    name: 'createGalgame',
    icon: 'lucide:wand',
    router: '/edit/topic'
  },
  {
    index: 6,
    name: 'about',
    icon: 'lucide:info',
    router: '/kungalgame'
  },
  {
    index: 7,
    name: 'friends',
    icon: 'lucide:handshake',
    router: '/friend-links'
  },
  { index: 8, name: 'join', icon: 'ph:telegram-logo', router: '/contact' },
  {
    index: 9,
    name: 'ranking',
    icon: 'lucide:align-end-horizontal',
    router: '/ranking'
  },
  {
    index: 10,
    name: 'update',
    icon: 'lucide:arrow-big-up-dash',
    router: '/update-log'
  },
  { index: 11, name: 'bylaw', icon: 'lucide:ruler', router: '/bylaw' },
  {
    index: 12,
    name: 'balance',
    icon: 'lucide:circle-dollar-sign',
    router: '/balance'
  },
  {
    index: 13,
    name: 'nonMoe',
    icon: 'lucide:ban',
    router: '/non-moe'
  },
  {
    index: 14,
    name: 'thanks',
    icon: 'lucide:heart-handshake',
    router: '/thanks-list'
  },
  {
    index: 15,
    name: 'donate',
    icon: 'lucide:hand-heart',
    router: '/donate'
  }
]
