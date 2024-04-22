export interface Hamburger {
  icon: string
  name: string
  router: string
  isNew: boolean
}

export const hamburgerItem: Hamburger[] = [
  {
    name: 'galgame',
    icon: 'lucide:gamepad-2',
    router: '/galgame',
    isNew: false
  },
  {
    name: 'pool',
    icon: 'lucide:square-library',
    router: '/pool',
    isNew: false
  },
  {
    name: 'category',
    icon: 'lucide:layers-3',
    router: '/category',
    isNew: false
  },
  {
    name: 'createTopic',
    icon: 'lucide:pencil',
    router: '/edit/topic',
    isNew: false
  },
  {
    name: 'createGalgame',
    icon: 'lucide:wand',
    router: '/edit/galgame',
    isNew: true
  },
  {
    name: 'about',
    icon: 'lucide:info',
    router: '/kungalgame',
    isNew: false
  },
  {
    name: 'friends',
    icon: 'lucide:handshake',
    router: '/friend-links',
    isNew: false
  },
  {
    name: 'ranking',
    icon: 'lucide:align-end-horizontal',
    router: '/ranking',
    isNew: false
  },
  {
    name: 'update',
    icon: 'lucide:arrow-big-up-dash',
    router: '/update-log',
    isNew: false
  },
  {
    name: 'balance',
    icon: 'lucide:circle-dollar-sign',
    router: '/balance',
    isNew: false
  },
  {
    name: 'nonMoe',
    icon: 'lucide:ban',
    router: '/non-moe',
    isNew: false
  },
  {
    name: 'thanks',
    icon: 'lucide:heart-handshake',
    router: '/thanks-list',
    isNew: false
  },
  {
    name: 'donate',
    icon: 'lucide:hand-heart',
    router: '/donate',
    isNew: false
  }
]
