interface PageName {
  index: number
  topic: number
  edit: number
  kungalgame: number
  pool: number
  bylaw: number
  technique: number
}

export interface KUNGalgameSettingsStore {
  showKUNGalgamePageWidth: Record<string, number>
  showKUNGalgameFontStyle: string
  showKUNGalgameBackground: string
  showKUNGalgameCustomBackground: string

  isShowPageWidth: boolean
}

export interface TempSettingStore {
  showKUNGalgameHamburger: boolean
  showKUNGalgamePanel: boolean
  showKUNGalgameUserPanel: boolean

  showKUNGalgameMessageBox: boolean
}
