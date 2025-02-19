export interface KunLayoutItem {
  icon: string
  name: string
  router: string
  label: string
  hint?: string
  external?: boolean
}

export const kunLayoutItem: KunLayoutItem[] = [
  {
    name: 'galgame',
    icon: 'lucide:gamepad-2',
    router: '/galgame',
    label: 'Galgame'
  },
  {
    name: 'pool',
    icon: 'lucide:square-library',
    router: '/pool',
    label: '所有话题'
  },
  {
    name: 'category',
    icon: 'lucide:layers-3',
    router: '/category',
    label: '话题分类'
  },
  {
    name: 'createTopic',
    icon: 'lucide:pencil',
    router: '/edit/topic',
    label: '发布话题'
  },
  {
    name: 'createGalgame',
    icon: 'lucide:wand',
    router: '/edit/galgame?type=publish',
    label: '发布 Galgame',
    hint: '新'
  },
  {
    name: 'about',
    icon: 'lucide:info',
    router: '/kungalgame',
    label: '关于我们'
  },
  {
    name: 'friends',
    icon: 'lucide:handshake',
    router: '/friend-links',
    label: '友情链接'
  },
  {
    name: 'ranking',
    icon: 'lucide:align-end-horizontal',
    router: '/ranking',
    label: '排行榜单'
  },
  {
    name: 'sticker',
    icon: 'lucide:image',
    router: 'https://sticker.kungal.com/',
    label: '表情包网站',
    external: true
  },
  {
    name: 'nav',
    icon: 'lucide:navigation',
    router: 'https://nav.kungal.org/',
    label: '导航网站',
    hint: '防失联',
    external: true
  },
  {
    name: 'update',
    icon: 'lucide:arrow-big-up-dash',
    router: '/update-log',
    label: '更新日志'
  },
  {
    name: 'nonMoe',
    icon: 'lucide:ban',
    router: '/non-moe',
    label: '不萌记录'
  }
]
