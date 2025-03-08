import type { KunSelectOption } from '~/components/kun/select/type'

export const KUN_TOPIC_CATEGORY: Record<string, string> = {
  galgame: 'Galgame',
  technique: '技术交流',
  others: '其它'
}

export const KUN_TOPIC_SECTION: Record<string, string> = {
  'g-walkthrough': '攻略',
  'g-chatting': '闲聊',
  'g-article': '文章',
  'g-seeking': '寻求资源',
  'g-news': '资讯',
  'g-releases': '新作消息',
  'g-other': '其它',
  't-crack': '逆向工程',
  't-web': 'Web',
  't-languages': '编程语言',
  't-help': '请求帮助',
  't-linux': 'Linux',
  't-practical': '实用技术',
  't-ai': 'AI',
  't-android': 'Android',
  't-adobe': 'Adobe',
  't-algorithm': '算法',
  't-other': '其它',
  'o-anime': '动漫',
  'o-comics': '漫画',
  'o-music': '音乐',
  'o-novel': '轻小说',
  'o-daily': '日常',
  'o-essay': '个人随笔',
  'o-forum': '论坛相关',
  'o-patch': '补丁网站',
  'o-other': '其它'
}

export const KUN_TOPIC_PAGE_SORT_FIELD: Record<string, string> = {
  views: '浏览',
  created: '时间',
  all: '全部分类'
}

export const KUN_TOPIC_DETAIL_STATUS: Record<string, string> = {
  featured: '被推',
  normal: '正常',
  banned: '封禁',
  pinned: '置顶',
  essential: '精华'
}

export const KUN_TOPIC_REPLY_PANEL_POSITION_MAP: Record<string, string> = {
  master: '狗修金',
  reply: '杂鱼~♡'
}

export const topicSortFieldOptions: KunSelectOption[] = [
  { value: 'created', label: '创建时间' },
  { value: 'views', label: '浏览量' }
]

export const topicSortCategoryOptions: KunSelectOption[] = [
  { value: 'all', label: '全部类型' },
  { value: 'galgame', label: 'Galgame' },
  { value: 'technique', label: '技术交流' },
  { value: 'others', label: '其它' }
]
