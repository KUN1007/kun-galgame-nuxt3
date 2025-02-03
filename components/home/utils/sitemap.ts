interface Sitemap {
  route: string
  name: string
  label: string
}

export const sitemap: Sitemap[] = [
  {
    route: '/agreement',
    name: 'agreement',
    label: '用户协议'
  },
  {
    route: '/category',
    name: 'category',
    label: '话题分类'
  },
  {
    route: '/contact',
    name: 'contact',
    label: '联系 / 加入我们'
  },
  {
    route: '/forgot',
    name: 'forgot',
    label: '忘记密码'
  },
  {
    route: '/friend-links',
    name: 'friendLinks',
    label: '友情链接'
  },
  {
    route: '/galgame',
    name: 'galgame',
    label: 'Galgame 资源'
  },
  {
    route: '/login',
    name: 'login',
    label: '登录'
  },
  {
    route: '/register',
    name: 'register',
    label: '注册'
  },
  {
    route: '/non-moe',
    name: 'nonMoe',
    label: '不萌记录'
  },
  {
    route: '/pool',
    name: 'pool',
    label: '全部话题'
  },
  {
    route: '/privacy',
    name: 'privacy',
    label: ''
  },
  {
    route: '/ranking',
    name: 'ranking',
    label: '排行榜单'
  },
  {
    route: '/report',
    name: 'report',
    label: '匿名举报'
  },
  {
    route: '/rss',
    name: 'rss',
    label: 'RSS 订阅'
  },
  {
    route: '/thanks-list',
    name: 'thanksList',
    label: '感谢名单'
  },
  {
    route: '/update-log',
    name: 'updateLog',
    label: '更新记录'
  },
  {
    route: '/search',
    name: 'search',
    label: '搜索'
  }
]
