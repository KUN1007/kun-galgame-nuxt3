export const SUPPORTED_TYPE = [
  'manual',
  'ai',
  'machine_polishing',
  'machine',
  'save',
  'crack',
  'fix',
  'mod',
  'other'
]

export const SUPPORTED_TYPE_MAP: Record<string, string> = {
  all: '全部类型',
  manual: '人工翻译补丁',
  ai: 'AI 翻译补丁',
  machine_polishing: '机翻润色',
  machine: '机翻补丁',
  save: '全 CG 存档',
  crack: '破解补丁',
  fix: '修正补丁',
  mod: '魔改补丁',
  other: '其它'
}

export const ALL_SUPPORTED_TYPE = ['all', ...SUPPORTED_TYPE]

export const resourceTypes = [
  {
    value: 'manual',
    label: '人工翻译补丁',
    description:
      '从制作开始到制作结束, 完全由人工进行, 无大范围 AI, 翻译器等参与的翻译补丁, 允许 5% 的 AI 翻译文本阈值'
  },
  {
    value: 'ai',
    label: 'AI 翻译补丁',
    description:
      '由 Sakura, Claude 3.5 Sonnet, GPT 4.0, DeepSeek-V2 等, 现代 AI 大语言模型参与翻译的补丁'
  },
  {
    value: 'machine_polishing',
    label: '机翻润色',
    description:
      '我们允许 5% 的机器翻译文本阈值, 任何超过这个阈值的翻译补丁都算作机翻润色补丁'
  },
  {
    value: 'machine',
    label: '机翻补丁',
    description:
      '某些旧时代非 AI 机翻的机器翻译补丁, 例如使用 VNR JBeijing7 等辞书进行离线机翻产生的机翻补丁'
  },
  {
    value: 'save',
    label: '全 CG 存档',
    description:
      '包括对 Galgame CG, 剧情解锁后生成的存档文件, savedata 数据等, 以供解锁 Galgame CG 和剧情'
  },
  {
    value: 'crack',
    label: '破解补丁',
    description: '免 CD 补丁, 免认证补丁, 脱壳补丁等'
  },
  {
    value: 'fix',
    label: '修正补丁',
    description:
      '游戏发售完成后, 官方可能会发放游戏修正补丁, 用来修复 BUG, 修正演出效果等'
  },
  {
    value: 'mod',
    label: '魔改补丁',
    description:
      '由 Cheat Engine 或者其它工具, 或者自行修改游戏资源数据, 对官方游戏内容, 玩法等产生变更, 产生的补丁'
  },
  {
    value: 'other',
    label: '其它',
    description:
      '除了 Galgame 游戏资源本体, Galgame 游戏 R18 内容补丁之外的, 没有提到的补丁种类'
  }
]

export const SUPPORTED_LANGUAGE = ['zh-Hans', 'zh-Hant', 'ja', 'en', 'other']

export const SUPPORTED_LANGUAGE_MAP: Record<string, string> = {
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
  ja: '日本語',
  en: 'English',
  other: '其它'
}

export const SUPPORTED_PLATFORM = [
  'windows',
  'android',
  'macos',
  'ios',
  'linux',
  'other'
]

export const SUPPORTED_PLATFORM_MAP: Record<string, string> = {
  windows: 'Windows',
  android: 'Android',
  macos: 'MacOS',
  ios: 'iOS',
  linux: 'Linux',
  other: '其它'
}

export const SUPPORTED_RESOURCE_LINK = ['s3', 'user']

export const storageTypes = [
  {
    value: 's3',
    label: '对象存储 (适合于 <1GB 的补丁文件)',
    description: '此选项适合 <1GB 的补丁, 稳定, 永远不会失效过期'
  },
  {
    value: 'user',
    label: '自定义链接 (适用于 >1GB 的补丁文件)',
    description: '此选项适合 >1GB 的补丁, 这需要您自行提供下载链接'
  }
]

export const SUPPORTED_RESOURCE_LINK_MAP: Record<string, string> = {
  s3: '对象存储下载',
  user: '自定义链接下载'
}

export const ALLOWED_MIME_TYPES = [
  'application/zip',
  'application/x-lz4',
  'application/x-rar-compressed'
]

export const ALLOWED_EXTENSIONS = ['.zip', '.rar', '.7z']

export const RESOURCE_UPLOAD_STATUS_MAP: Record<number, string> = {
  1: '正在上传中...',
  2: '合并文件中...',
  3: '上传文件成功~',
  4: '上传文件失败!'
}
