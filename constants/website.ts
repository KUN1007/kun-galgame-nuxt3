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
  all: '页面默认不含 R18 内容',
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

  // resource > 5
  update0: '每日更新',
  update1: '每周更新',
  update2: '每月更新',
  update3: '更新缓慢 / 停滞',

  storage0: '自建存储',
  storage1: '不限速下载方式 / 种子',
  storage2: '网盘下载',
  storage3: '网赚盘',

  support0: '失效资源快速补档',
  support1: '有补档机制，但响应慢',
  support2: '无人维护，失效链接多',

  // <10%
  trash_storage0: '无网赚盘',
  // > 30%
  trash_storage1: '有少量网赚盘',
  // >50%
  trash_storage2: '有大量网赚盘',

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

  // recommend, professional articles, high-quality comment
  curation0: '精选推荐',
  // community ranking, tags
  curation1: '社区评分/标签',
  // only categorize
  curation2: '仅简单分类',
  // mess
  curation3: '内容杂乱无章',

  // perfectly compatible mobile (same functionality, perfect display)
  mobile0: '移动端完美适配',
  mobile1: '移动版体验一般',
  mobile2: '移动端体验差',

  // multi-factors(tags, producers) search, ai-powered search
  search0: '高级搜索',
  // only title / description / alias
  search1: '基本搜索',
  search2: '搜索功能差',

  // no abusing or other unmoe behaviors
  vibe0: '氛围友好',
  vibe1: '氛围一般',
  vibe2: '氛围较差',

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

  // modern web tech-stack / 2FA
  security0: '安全性高',
  // https / WordPress
  security1: '基础安全',
  // harmful app / scripts
  security2: '存在安全风险',

  patch: '补丁站',
  // Powered by OpenList / Alist or other cloud-storage program
  cloud: '网盘站',
  // Impl CFMSC or other wiki-like features
  wiki: '百科站',
  localization: '汉化资源为主',
  raw: '生肉资源为主',
  // information website
  info: '不提供本体资源下载'
}

export const KUN_TAG_CATEGORY_TITLE: Record<string, string> = {
  ad: '广告程度',
  open: '开源情况',
  resource: '资源数量',
  update: '资源更新频率',
  storage: '下载方式',
  support: '补档速度',
  trash_storage: '网赚盘比例',
  age: '网站年龄',
  threshold: '访问门槛',
  intro: '内容介绍',
  curation: '内容筛选与整理',
  mobile: '移动端适配',
  search: '搜索支持',
  vibe: '网站氛围',
  active: '社区活跃度',
  performance: '网站性能',
  security: '网站安全性',
  misc: '网站类型'
}
