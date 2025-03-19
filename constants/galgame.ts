import type { KunTabItem } from '~/components/kun/tab/type'
import type { KunSelectOption } from '~/components/kun/select/type'

export type KunGalgameResourceTypeOptions =
  | 'all'
  | 'game'
  | 'patch'
  | 'collection'
  | 'voice'
  | 'image'
  | 'ai'
  | 'others'

export type KunGalgameResourceLanguageOptions =
  | 'all'
  | 'ja-jp'
  | 'en-us'
  | 'zh-cn'
  | 'zh-tw'
  | 'others'

export type KunGalgameResourcePlatformOptions =
  | 'all'
  | 'windows'
  | 'mac'
  | 'linux'
  | 'emulator'
  | 'app'
  | 'others'

export const KUN_GALGAME_RESOURCE_TYPE_MAP: Record<string, string> = {
  name: '资源链接的类型',
  all: '全部类型',
  game: '游戏本体',
  patch: '补丁',
  collection: '合集',
  voice: '音声相关',
  image: '图片相关',
  ai: 'AI 相关',
  others: '其它'
}

export const kunGalgameResourceTypeOptions: KunSelectOption[] = [
  { value: 'name', label: '资源链接的类型' },
  { value: 'all', label: '全部类型' },
  { value: 'game', label: '游戏本体' },
  { value: 'patch', label: '补丁' },
  { value: 'collection', label: '合集' },
  { value: 'voice', label: '音声相关' },
  { value: 'image', label: '图片相关' },
  { value: 'ai', label: 'AI 相关' },
  { value: 'others', label: '其它' }
]

export const KUN_GALGAME_RESOURCE_LANGUAGE_MAP: Record<string, string> = {
  all: '全部语言',
  'ja-jp': '日语',
  'en-us': '英语',
  'zh-cn': '简体中文',
  'zh-tw': '繁体中文',
  others: '其它'
}

export const kunGalgameResourceLanguageOptions: KunSelectOption[] = [
  { value: 'all', label: '全部语言' },
  { value: 'ja-jp', label: '日语' },
  { value: 'en-us', label: '英语' },
  { value: 'zh-cn', label: '简体中文' },
  { value: 'zh-tw', label: '繁体中文' },
  { value: 'others', label: '其它' }
]

export const KUN_GALGAME_RESOURCE_PLATFORM_MAP: Record<string, string> = {
  name: '资源链接的平台',
  all: '全部平台',
  windows: 'Windows',
  mac: 'macOS',
  linux: 'Linux',
  emulator: '模拟器',
  app: '应用直装',
  others: '其它'
}

export const kunGalgameResourcePlatformOptions: KunSelectOption[] = [
  { value: 'name', label: '资源链接的平台' },
  { value: 'all', label: '全部平台' },
  { value: 'windows', label: 'Windows' },
  { value: 'mac', label: 'macOS' },
  { value: 'linux', label: 'Linux' },
  { value: 'emulator', label: '模拟器' },
  { value: 'app', label: '应用直装' },
  { value: 'others', label: '其它' }
]

export const KUN_GALGAME_RESOURCE_SORT_FIELD_MAP: Record<string, string> = {
  views: '浏览顺序',
  time: '更新顺序',
  created: '创建顺序'
}

export const kunGalgameSortFieldOptions: KunSelectOption[] = [
  { value: 'views', label: '浏览顺序' },
  { value: 'time', label: '更新顺序' },
  { value: 'created', label: '创建顺序' }
]

export const KUN_GALGAME_RESOURCE_PULL_REQUEST_STATUS_MAP: Record<
  number,
  string
> = {
  0: '进行中',
  1: '已合并',
  2: '已拒绝'
}

export const KUN_GALGAME_RESOURCE_PULL_REQUEST_ACTION_MAP: Record<
  string,
  string
> = {
  created: '创建了',
  updated: '更新了',
  deleted: '删除了',
  merged: '合并了',
  declined: '拒绝了'
}

export const KUN_GALGAME_RESOURCE_PULL_REQUEST_TYPE_MAP: Record<
  string,
  string
> = {
  galgame: 'Galgame',
  banner: '预览图',
  link: '相关链接',
  pr: '更新请求'
}

export const KUN_GALGAME_RESOURCE_PULL_REQUEST_I18N_FIELD_MAP: Record<
  string,
  string | KunLanguage
> = {
  name: {
    'en-us': '英语标题',
    'ja-jp': '日语标题',
    'zh-cn': '简体中文',
    'zh-tw': '繁体中文'
  },
  introduction: {
    'en-us': '英语介绍',
    'ja-jp': '日语介绍',
    'zh-cn': '简体中文',
    'zh-tw': '繁体中文'
  },
  tags: '标签',
  series: '系列',
  alias: '别名',
  official: '官网',
  engine: '引擎'
}

export const galgameIntroductionLanguageTabs: KunTabItem[] = [
  {
    textValue: '英语标题',
    value: 'en-us'
  },
  {
    textValue: '日语标题',
    value: 'ja-jp'
  },
  {
    textValue: '简体中文',
    value: 'zh-cn'
  },
  {
    textValue: '繁体中文',
    value: 'zh-tw'
  }
]
