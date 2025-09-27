export interface ToolsetStoreTemp {
  page: number
  limit: number
  type:
    | 'all'
    | 'emulator'
    | 'translator'
    | 'extractor'
    | 'converter'
    | 'debug'
    | 'launcher'
    | 'script'
    | 'docs'
    | 'others'
  language: 'all' | 'ja-jp' | 'en-us' | 'zh-cn' | 'zh-tw' | 'others'
  platform: 'all' | 'windows' | 'mac' | 'linux' | 'emulator' | 'others'
  version: 'all' | 'alpha' | 'beta' | 'rc' | 'stable'
  sortField: 'resource_update_time' | 'created' | 'view'
  sortOrder: KunOrder
}
