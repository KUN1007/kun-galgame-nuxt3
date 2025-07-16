export const KUN_WEBSITE_CATEGORY_MAP: Record<string, string> = {
  resource: 'Galgame 资源网站',
  community: 'Galgame 社区网站',
  telegram: 'Galgame Telegram 群组',
  other: '其它网站'
}

export const KUN_WEBSITE_LANGUAGE_MAP: Record<string, string> = {
  'en-us': '英语',
  'ja-jp': '日语',
  'zh-cn': '简体中文',
  'zh-tw': '繁体中文'
}

export const KUN_WEBSITE_ACG_LIMIT_MAP: Record<string, string> = {
  all: '不含 R18 内容',
  r18: '含有 R18 内容'
}

export const KUN_WEBSITE_TAG_MAP: Record<string, string> = {
  ad0: '无广告',
  // <3
  ad1: '少量广告',
  // >3 & <6
  ad2: '有广告',
  // >6
  ad3: '广告较多',

  open0: '完全开源',
  open1: '部分开源',
  open2: '不开源',

  // >10000
  resource0: '资源超丰富',
  // >5000
  resource1: '资源较多',
  // >2000
  resource2: '资源数一般',
  // <1000
  resource3: '资源较少',

  trash_storage0: '自建存储',
  // <10%
  trash_storage1: '无网赚盘',
  // > 30%
  trash_storage2: '有网赚盘',
  // >50%
  trash_storage3: '大量网赚盘',

  age0: '存活 20 年+',
  age1: '存活 10 年+',
  age2: '存活 5 年+',
  age3: '存活 3 年+',
  age4: '存活 1 年+',
  age5: '新站',

  threshold0: '无门槛',
  threshold1: '需登录',
  threshold2: '需登录 + 回复',
  threshold3: '需登录 + 积分',
  threshold4: '获取资源难',

  intro0: '介绍非常详细',
  intro1: '介绍较多',
  intro2: '介绍一般',
  intro3: '无游戏介绍',

  // new create items > 300 / 1day
  active0: '社区超级活跃',
  // > 100
  active1: '社区活跃',
  // > 50
  active2: '社区较活跃',
  // > 10
  active3: '活跃度一般',
  // < 10
  active4: '社区较冷',

  // first-content load complete < 3s, based on SSR App, SPA -3s
  performance0: '网站速度极快',
  // <6s
  performance2: '网站加载快',
  // <9s
  performance3: '网站速度一般',
  // >12s
  performance4: '网站速度较慢',

  patch: '补丁站',
  // Powered by OpenList / Alist or other cloud-storage program
  cloud: '网盘站',
  // Impl CFMSC or other wiki-like features
  wiki: '百科站'
}
