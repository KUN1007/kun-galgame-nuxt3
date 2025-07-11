import type { KunTabItem } from '~/components/kun/tab/type'

export const kunCategoryAvailableItem: KunTabItem[] = [
  {
    value: 'galgame',
    textValue: 'Galgame',
    href: '/category/galgame'
  },
  {
    value: 'technique',
    textValue: '技术交流',
    href: '/category/technique'
  },
  {
    value: 'others',
    textValue: '其它话题',
    href: '/category/others'
  }
]

export const KUN_CATEGORY_DESCRIPTION_MAP: Record<string, string> = {
  galgame:
    'Galgame 相关的话题, 攻略, 闲聊, 长文, 寻求资源, 游戏疑难杂症求助, 新作消息, 资讯, 本地化, 逆向等等',
  technique:
    '技术相关的话题, Web 开发, 编程语言, 寻求帮助, Linux, 实用技术, AI, 逆向工程, Android, Adobe, 算法等等',
  others:
    '其它话题, 动漫, 漫画, 音乐, 轻小说, 日常, 个人随笔, 论坛相关, 鲲 Galgame 补丁网站相关, 其它内容'
}

export const KUN_ALLOWED_CATEGORY = ['galgame', 'technique', 'others'] as const
