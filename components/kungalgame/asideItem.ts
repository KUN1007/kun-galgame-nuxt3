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
    icon: 'lucide:user-round-check',
    router: '/agreement',
    label: 'KUN Visual Novel User Agreement | 鲲 Galgame 用户协议'
  },
  {
    index: 2,
    name: 'privacy',
    icon: 'lucide:book-lock',
    router: '/privacy',
    label: 'KUN Visual Novel Privacy | 鲲 Galgame 隐私政策'
  },
  {
    index: 4,
    name: 'update',
    icon: 'lucide:arrow-big-up-dash',
    router: '/update-log',
    label: 'KUN Visual Novel Update Log | 鲲 Galgame 更新日志'
  },
  {
    index: 6,
    name: 'nonMoe',
    icon: 'lucide:ban',
    router: '/non-moe',
    label: 'KUN Visual Novel Non-Moe | 鲲 Galgame 不萌记录'
  },
  {
    index: 7,
    name: 'join',
    icon: 'ph:telegram-logo',
    router: '/contact',
    label: 'KUN Visual Novel Contact | 鲲 Galgame 加入我们'
  },
  {
    index: 8,
    name: 'thanks',
    icon: 'lucide:heart-handshake',
    router: '/thanks-list',
    label: 'KUN Visual Novel Thanks-List | 鲲 Galgame 感谢名单'
  },
  {
    index: 9,
    name: 'donate',
    icon: 'lucide:hand-heart',
    router: '/donate',
    label: 'KUN Visual Novel Donate | 鲲 Galgame 赞助我们'
  },
  {
    index: 10,
    name: 'home',
    icon: 'lucide:home',
    router: '/',
    label: 'KUN Visual Novel Home | 鲲 Galgame 返回主页'
  }
]
