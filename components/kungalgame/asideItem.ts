interface asideBar {
  index: number
  name: string
  icon: string
  router: string
  label: string
}

export const asideBarItem: asideBar[] = [
  {
    index: 1,
    name: 'agreement',
    icon: 'line-md:person',
    router: '/agreement',
    label: 'KUN Visual Novel User Agreement | 鲲 Galgame 用户协议'
  },
  {
    index: 2,
    name: 'privacy',
    icon: 'line-md:map-marker-off',
    router: '/privacy',
    label: 'KUN Visual Novel Privacy | 鲲 Galgame 隐私政策'
  },
  {
    index: 3,
    name: 'bylaw',
    icon: 'line-md:document-list',
    router: '/bylaw',
    label: 'KUN Visual Novel Bylaw | 鲲 Galgame 执行条例'
  },
  {
    index: 4,
    name: 'update',
    icon: 'ic:round-update',
    router: '/update-log',
    label: 'KUN Visual Novel Update Log | 鲲 Galgame 更新日志'
  },
  {
    index: 5,
    name: 'pl',
    icon: 'solar:dollar-outline',
    router: '/balance',
    label: 'KUN Visual Novel Balance | 鲲 Galgame 收支公示'
  },
  {
    index: 6,
    name: 'nonMoe',
    icon: 'line-md:minus-circle',
    router: '/non-moe',
    label: 'KUN Visual Novel Non-Moe | 鲲 Galgame 不萌记录'
  },
  {
    index: 7,
    name: 'join',
    icon: 'line-md:telegram',
    router: '/contact',
    label: 'KUN Visual Novel Contact | 鲲 Galgame 加入我们'
  },
  {
    index: 8,
    name: 'thanks',
    icon: 'line-md:heart',
    router: '/thanks-list',
    label: 'KUN Visual Novel Thanks-List | 鲲 Galgame 感谢名单'
  },
  {
    index: 9,
    name: 'donate',
    icon: 'ph:hand-heart',
    router: '/donate',
    label: 'KUN Visual Novel Donate | 鲲 Galgame 赞助我们'
  },
  {
    index: 10,
    name: 'home',
    icon: 'line-md:home-md-twotone',
    router: '/',
    label: 'KUN Visual Novel Home | 鲲 Galgame 返回主页'
  }
]
