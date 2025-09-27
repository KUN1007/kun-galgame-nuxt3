import type { KunSelectOption } from '~/components/kun/select/type'

export const KUN_GALGAME_TOOLSET_TYPE_MAP: Record<string, string> = {
  name: '工具类型',
  all: '全部类型',
  emulator: '模拟器相关 (KRKR 等)',
  translator: '翻译相关 (翻译器, 文本 Hook, OCR 等)',
  extractor: '解包工具',
  converter: '资源转换 (音频/图片/字体)',
  engine: '引擎相关工具',
  debug: '开发者工具',
  launcher: '游戏管理工具',
  script: '自动化脚本',
  docs: '文档相关 (指南, 社区资源 等)',
  others: '其它'
}
export const kunGalgameToolsetTypeOptions: KunSelectOption[] = [
  { value: 'all', label: '全部类型' },
  { value: 'emulator', label: '模拟器相关 (KRKR 等)' },
  { value: 'translator', label: '翻译相关 (翻译器, 文本 Hook, OCR 等)' },
  { value: 'extractor', label: '解包工具' },
  { value: 'converter', label: '资源转换 (音频/图片/字体)' },
  { value: 'engine', label: '引擎相关工具' },
  { value: 'debug', label: '开发者工具' },
  { value: 'launcher', label: '游戏管理工具' },
  { value: 'script', label: '自动化脚本' },
  { value: 'docs', label: '文档相关 (指南, 社区资源 等)' },
  { value: 'others', label: '其它' }
]
export const KUN_TOOLSET_TYPE_CONST = [
  'name',
  'all',
  'emulator',
  'translator',
  'extractor',
  'converter',
  'engine',
  'debug',
  'launcher',
  'script',
  'docs',
  'others'
] as const

export const KUN_GALGAME_TOOLSET_LANGUAGE_MAP: Record<string, string> = {
  all: '全部语言',
  'ja-jp': '日语',
  'en-us': '英语',
  'zh-cn': '简体中文',
  'zh-tw': '繁体中文',
  others: '其它'
}
export const kunGalgameToolsetLanguageOptions: KunSelectOption[] = [
  { value: 'all', label: '全部语言' },
  { value: 'ja-jp', label: '日语' },
  { value: 'en-us', label: '英语' },
  { value: 'zh-cn', label: '简体中文' },
  { value: 'zh-tw', label: '繁体中文' },
  { value: 'others', label: '其它' }
]
export const KUN_TOOLSET_LANGUAGE_CONST = [
  'ja-jp',
  'en-us',
  'zh-cn',
  'zh-tw',
  'others'
] as const

export const KUN_GALGAME_TOOLSET_PLATFORM_MAP: Record<string, string> = {
  name: '工具平台',
  all: '全部平台',
  windows: 'Windows',
  mac: 'macOS',
  linux: 'Linux',
  emulator: '模拟器',
  others: '其它'
}
export const kunGalgameToolsetPlatformOptions: KunSelectOption[] = [
  { value: 'all', label: '全部平台' },
  { value: 'windows', label: 'Windows' },
  { value: 'mac', label: 'macOS' },
  { value: 'linux', label: 'Linux' },
  { value: 'emulator', label: '模拟器' },
  { value: 'others', label: '其它' }
]
export const KUN_TOOLSET_PLATFORM_CONST = [
  'windows',
  'mac',
  'linux',
  'emulator',
  'others'
] as const

export const KUN_GALGAME_TOOLSET_VERSION_MAP: Record<string, string> = {
  alpha: '内测版本',
  beta: '公测版本',
  rc: '候选版本',
  stable: '稳定版本'
}
export const kunGalgameToolsetVersionOptions: KunSelectOption[] = [
  { value: 'alpha', label: '内测版本' },
  { value: 'beta', label: '公测版本' },
  { value: 'rc', label: '候选版本' },
  { value: 'stable', label: '稳定版本' }
]
export const KUN_TOOLSET_VERSION_CONST = [
  'alpha',
  'beta',
  'rc',
  'stable'
] as const

export const KUN_GALGAME_TOOLSET_STORAGE_MAP: Record<string, string> = {
  s3: '对象存储下载',
  user: '自定义链接下载'
}
export const KUN_TOOLSET_STORAGE_CONST = ['s3', 'user'] as const

export const KUN_GALGAME_TOOLSET_UPLOAD_STATUS_MAP: Record<string, string> = {
  idle: '未开始上传',
  smallInit: '正在请求小文件上传接口',
  smallUploading: '正在上传小文件',
  smallComplete: '正在请求结束上传接口',
  largeInit: '正在请求大文件接口',
  largeUploading: '正在上传大文件【进度 ${progress.value}%】',
  largeComplete: '正在请求结束上传接口',
  complete: '文件已成功上传'
}

export const KUN_GALGAME_TOOLSET_UPLOAD_STATUS_CONST = [
  'idle',
  'smallInit',
  'smallUploading',
  'smallComplete',
  'largeInit',
  'largeUploading',
  'largeComplete',
  'complete'
] as const
