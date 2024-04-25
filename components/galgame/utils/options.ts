export const typeOptions = [
  'all',
  'game',
  'patch',
  'collection',
  'voice',
  'image',
  'ai',
  'others'
]
export const languageOptions = ['all', 'ja-jp', 'en-us', 'zh-cn', 'others']
export const platformOptions = [
  'all',
  'windows',
  'mac',
  'linux',
  'emulator',
  'app',
  'others'
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

export type LanguageOptions = 'all' | 'ja-jp' | 'en-us' | 'zh-cn' | 'others'

export type PlatformOptions =
  | 'all'
  | 'windows'
  | 'mac'
  | 'linux'
  | 'emulator'
  | 'app'
  | 'others'
