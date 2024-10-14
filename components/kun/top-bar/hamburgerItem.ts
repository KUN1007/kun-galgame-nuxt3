export interface Hamburger {
  icon: string
  name: string
  router: string
  hint?: string
  external?: boolean
}

export const hamburgerItem: Hamburger[] = [
  {
    name: 'galgame',
    icon: 'lucide:gamepad-2',
    router: '/galgame'
  },
  {
    name: 'pool',
    icon: 'lucide:square-library',
    router: '/pool'
  },
  {
    name: 'category',
    icon: 'lucide:layers-3',
    router: '/category'
  },
  {
    name: 'createTopic',
    icon: 'lucide:pencil',
    router: '/edit/topic'
  },
  {
    name: 'createGalgame',
    icon: 'lucide:wand',
    router: '/edit/galgame?type=publish',
    hint: 'createHint'
  },
  {
    name: 'about',
    icon: 'lucide:info',
    router: '/kungalgame'
  },
  {
    name: 'friends',
    icon: 'lucide:handshake',
    router: '/friend-links'
  },
  {
    name: 'ranking',
    icon: 'lucide:align-end-horizontal',
    router: '/ranking'
  },
  {
    name: 'sticker',
    icon: 'lucide:image',
    router: 'https://sticker.kungal.com/',
    external: true
  },
  {
    name: 'nav',
    icon: 'lucide:navigation',
    router: 'https://nav.kungal.org/',
    hint: 'navHint',
    external: true
  },
  {
    name: 'update',
    icon: 'lucide:arrow-big-up-dash',
    router: '/update-log'
  },
  {
    name: 'nonMoe',
    icon: 'lucide:ban',
    router: '/non-moe'
  },
  {
    name: 'thanks',
    icon: 'lucide:heart-handshake',
    router: '/thanks-list'
  },
  {
    name: 'donate',
    icon: 'lucide:hand-heart',
    router: '/donate'
  }
]
