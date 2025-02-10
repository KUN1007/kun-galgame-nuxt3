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

export const KUN_GALGAME_RESOURCE_LANGUAGE_MAP: Record<string, string> = {
  all: '全部语言',
  'ja-jp': '日语',
  'en-us': '英语',
  'zh-cn': '简体中文',
  'zh-tw': '繁体中文',
  others: '其它'
}

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

export const KUN_GALGAME_RESOURCE_SORT_FIELD_MAP: Record<string, string> = {
  views: '浏览顺序',
  time: '更新顺序',
  created: '创建顺序'
}

export const KUN_GALGAME_RESOURCE_PULL_REQUEST_STATUS_MAP: Record<
  number,
  string
> = {
  0: '进行中',
  1: '已合并',
  2: '已拒绝'
}
