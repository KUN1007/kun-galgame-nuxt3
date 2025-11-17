export interface KunLayoutItem {
  name: string
  label: string
  icon?: string
  router?: string
  hint?: string
  external?: boolean
  isCollapse?: boolean
  children?: KunLayoutItem[]
}

export interface KunLayoutCollapsedItem {
  name: string
  label: string
  icon: string
  router: string
}

export const kunLayoutItem: KunLayoutItem[] = [
  {
    name: 'create',
    icon: 'lucide:pencil',
    label: '发布主题',
    isCollapse: false,
    children: [
      {
        name: 'createTopic',
        icon: 'icon-park-outline:topic',
        router: '/edit/topic',
        label: '发布话题',
        hint: '大升级'
      },
      {
        name: 'createGalgame',
        icon: 'lucide:gamepad-2',
        router: '/edit/galgame/create',
        label: '发布 Galgame'
      },
      {
        name: 'createToolset',
        icon: 'lucide:wrench',
        router: '/edit/toolset/create',
        label: '发布 Gal 工具',
        hint: '新'
      }
    ]
  },
  {
    name: 'galgame',
    icon: 'lucide:gamepad-2',
    label: 'Galgame',
    isCollapse: false,
    children: [
      {
        name: 'galgame',
        icon: 'lucide:box',
        router: '/galgame',
        label: 'Galgame'
      },
      {
        name: 'galgame-rating',
        icon: 'lucide:lollipop',
        router: '/galgame-rating',
        label: 'Galgame 评分',
        hint: '最强!'
      },
      {
        name: 'website',
        icon: 'lucide:globe',
        router: '/website',
        label: 'Gal 网站 Wiki',
        hint: '起飞!'
      },
      {
        name: 'toolset',
        icon: 'lucide:wrench',
        router: '/toolset',
        label: 'Gal 工具资源',
        hint: '最实用!'
      },
      {
        name: 'galgame-resource',
        icon: 'lucide:download',
        router: '/galgame-resource',
        label: 'Gal 资源列表',
        hint: '新'
      },
      {
        name: 'galgame-series',
        icon: 'lucide:boxes',
        router: '/galgame-series',
        label: 'Galgame 系列',
        hint: '新'
      },
      {
        name: 'galgame-official',
        icon: 'cuida:building-outline',
        router: '/galgame-official',
        label: 'Galgame 会社',
        hint: '新'
      },
      {
        name: 'galgame-tag',
        icon: 'lucide:tag',
        router: '/galgame-tag',
        label: 'Galgame 标签',
        hint: '新'
      },
      {
        name: 'galgame-engine',
        icon: 'carbon:ibm-engineering-lifecycle-mgmt',
        router: '/galgame-engine',
        label: 'Galgame 引擎',
        hint: '新'
      }
    ]
  },
  {
    name: 'topic',
    icon: 'icon-park-outline:topic',
    label: '话题',
    isCollapse: false,
    children: [
      {
        name: 'topic',
        icon: 'lucide:library-big',
        router: '/topic',
        label: '全部话题'
      },
      {
        name: 'resource',
        icon: 'lucide:message-circle-question-mark',
        router: '/resource',
        label: '资源和求助话题'
      },
      {
        name: 'galgame',
        icon: 'lucide:gamepad-2',
        router: '/category/galgame',
        label: 'Galgame 类'
      },
      {
        name: 'technique',
        icon: 'lucide:drafting-compass',
        router: '/category/technique',
        label: '技术交流 类'
      },
      {
        name: 'others',
        icon: 'lucide:circle-ellipsis',
        router: '/category/others',
        label: '其它 类'
      }
    ]
  },
  {
    name: 'activity',
    icon: 'lucide:activity',
    label: '网站动态',
    isCollapse: false,
    children: [
      {
        name: 'timeline',
        router: '/activity',
        label: '动态时间线',
        hint: '新'
      },
      {
        name: 'activity',
        router: '/activity/category',
        label: '分类动态'
      }
    ]
  },
  {
    name: 'ranking',
    icon: 'lucide:align-end-horizontal',
    label: '排行榜单',
    isCollapse: true,
    children: [
      {
        name: 'ranking',
        router: '/ranking/topic',
        label: '话题排行',
        hint: '优化'
      },
      {
        name: 'galgame',
        router: '/ranking/galgame',
        label: 'Galgame 排行',
        hint: '新'
      },
      {
        name: 'ranking',
        router: '/ranking/user',
        label: '用户排行',
        hint: '优化'
      }
    ]
  },
  {
    name: 'update',
    icon: 'lucide:arrow-big-up-dash',
    label: '更新日志',
    isCollapse: true,
    children: [
      {
        name: 'history',
        router: '/update/history',
        label: '更新历史'
      },
      {
        name: 'todo',
        router: '/update/todo',
        label: '待办列表'
      }
    ]
  },
  {
    name: 'doc',
    icon: 'lucide:info',
    router: '/doc',
    label: '关于我们'
  },
  {
    name: 'friends',
    icon: 'lucide:handshake',
    router: '/friend-links',
    label: '友情链接'
  },
  {
    name: 'unmoe',
    icon: 'lucide:ban',
    router: '/unmoe',
    label: '不萌记录'
  }
]

export const kunLayoutExternalItem: KunLayoutItem[] = [
  {
    name: 'patch',
    icon: 'lucide:puzzle',
    router: 'https://www.moyu.moe/',
    label: 'Galgame 补丁站',
    external: true,
    hint: '震憾上线'
  },
  {
    name: 'sticker',
    icon: 'lucide:image',
    router: 'https://sticker.kungal.com/',
    label: 'Galgame 表情包',
    external: true,
    hint: '全网最全'
  },
  {
    name: 'doc',
    icon: 'lucide:code-xml',
    router: 'https://soft.moe/kun-visualnovel-docs/kun-forum.html',
    label: '开发文档',
    hint: '开源一切',
    external: true
  },
  {
    name: 'nav',
    icon: 'lucide:navigation',
    router: 'https://nav.kungal.org/',
    label: '导航网站',
    hint: '防失联',
    external: true
  }
]
