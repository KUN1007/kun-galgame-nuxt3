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
    icon: 'line-md:text-box-to-text-box-multiple-transition',
    router: '/pool',
  },
  {
    index: 2,
    name: 'create',
    icon: 'line-md:pencil-twotone-alt',
    router: '/edit',
  },
  {
    index: 3,
    name: 'technique',
    icon: 'material-symbols:code-rounded',
    router: '/technique',
  },
  {
    index: 4,
    name: 'about',
    icon: 'line-md:alert-circle',
    router: '/kungalgame',
  },
  {
    index: 5,
    name: 'ranking',
    icon: 'solar:ranking-outline',
    router: '/ranking',
  },
  { index: 6, name: 'update', icon: 'ic:round-update', router: '/update-log' },
  { index: 7, name: 'bylaw', icon: 'line-md:document-list', router: '/bylaw' },
  {
    index: 8,
    name: 'balance',
    icon: 'solar:dollar-outline',
    router: '/balance',
  },
  {
    index: 9,
    name: 'nonMoe',
    icon: 'line-md:minus-circle',
    router: '/non-moe',
  },
  {
    index: 10,
    name: 'thanks',
    icon: 'line-md:heart',
    router: '/thanks-list',
  },
  {
    index: 11,
    name: 'donate',
    icon: 'ph:hand-heart',
    router: '/donate',
  },
  { index: 12, name: 'join', icon: 'line-md:telegram', router: '/contact' },
]
