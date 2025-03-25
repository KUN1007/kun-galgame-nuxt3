import type { KunSelectOption } from '~/components/kun/select/type'

export const typeOptions: KunSelectOption[] = [
  { value: 'all', label: '全部类型' },
  { value: 'game', label: '游戏本体' },
  { value: 'patch', label: '补丁' },
  { value: 'collection', label: '合集' },
  { value: 'voice', label: '音声相关' },
  { value: 'image', label: '图片相关' },
  { value: 'ai', label: 'AI 相关' },
  { value: 'others', label: '其它' }
]

export const languageOptions: KunSelectOption[] = [
  { value: 'all', label: '全部语言' },
  { value: 'ja-jp', label: '日语' },
  { value: 'en-us', label: '英语' },
  { value: 'zh-cn', label: '简体中文' },
  { value: 'zh-tw', label: '繁体中文' },
  { value: 'others', label: '其它' }
]

export const platformOptions: KunSelectOption[] = [
  { value: 'name', label: '资源链接的平台' },
  { value: 'all', label: '全部平台' },
  { value: 'windows', label: 'Windows' },
  { value: 'mac', label: 'macOS' },
  { value: 'linux', label: 'Linux' },
  { value: 'emulator', label: '模拟器' },
  { value: 'app', label: '应用直装' },
  { value: 'others', label: '其它' }
]

export const sortFieldOptions: KunSelectOption[] = [
  { value: 'views', label: '浏览顺序' },
  { value: 'time', label: '更新顺序' },
  { value: 'created', label: '创建顺序' }
]

export type TypeOptions =
  | 'all'
  | 'game'
  | 'patch'
  | 'collection'
  | 'voice'
  | 'image'
  | 'ai'
  | 'others'

export type LanguageOptions =
  | 'all'
  | 'ja-jp'
  | 'en-us'
  | 'zh-cn'
  | 'zh-tw'
  | 'others'

export type PlatformOptions =
  | 'all'
  | 'windows'
  | 'mac'
  | 'linux'
  | 'emulator'
  | 'app'
  | 'others'
