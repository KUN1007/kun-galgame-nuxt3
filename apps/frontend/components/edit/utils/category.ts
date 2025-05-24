import type { KunSelectOption } from '~/components/kun/select/type'

export interface Category {
  index: number
  name: string
  options: KunSelectOption[]
  placeholder: string
}

export const galgameSection: KunSelectOption[] = [
  { value: 'g-walkthrough', label: '攻略' },
  { value: 'g-chatting', label: '闲聊' },
  { value: 'g-article', label: '文章' },
  { value: 'g-seeking', label: '寻求资源' },
  { value: 'g-news', label: '资讯' },
  { value: 'g-releases', label: '新作消息' },
  { value: 'g-other', label: '其它' }
]

export const techniqueSection: KunSelectOption[] = [
  { value: 't-crack', label: '逆向工程' },
  { value: 't-web', label: 'Web' },
  { value: 't-languages', label: '编程语言' },
  { value: 't-help', label: '请求帮助' },
  { value: 't-linux', label: 'Linux' },
  { value: 't-practical', label: '实用技术' },
  { value: 't-ai', label: 'AI' },
  { value: 't-android', label: 'Android' },
  { value: 't-adobe', label: 'Adobe' },
  { value: 't-algorithm', label: '算法' },
  { value: 't-other', label: '其它' }
]

export const otherSection: KunSelectOption[] = [
  { value: 'o-anime', label: '动漫' },
  { value: 'o-comics', label: '漫画' },
  { value: 'o-music', label: '音乐' },
  { value: 'o-novel', label: '轻小说' },
  { value: 'o-daily', label: '日常' },
  { value: 'o-essay', label: '个人随笔' },
  { value: 'o-forum', label: '论坛相关' },
  { value: 'o-patch', label: '补丁网站' },
  { value: 'o-other', label: '其它' }
]

export const iconMap: Record<string, string> = {
  g: 'lucide:gamepad-2',
  t: 'lucide:drafting-compass',
  o: 'lucide:circle-ellipsis'
}

export const topicCategory: Category[] = [
  {
    index: 1,
    name: 'Galgame',
    options: galgameSection,
    placeholder: '请选择 Galgame 分类的分区'
  },
  {
    index: 2,
    name: 'Technique',
    options: techniqueSection,
    placeholder: '请选择技术交流分类的分区'
  },
  {
    index: 3,
    name: 'Others',
    options: otherSection,
    placeholder: '请选择其它分类的分区'
  }
]
