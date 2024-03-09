import type { MessageStatus } from '~/types/utils/message'

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
  showKUNGalgamePageTransparency: number
  showKUNGalgameFontStyle: string
  showKUNGalgameBackground: number
}

export interface TempSettingStore {
  showKUNGalgameHamburger: boolean
  showKUNGalgamePanel: boolean
  showKUNGalgameUserPanel: boolean

  showKUNGalgameMessageBox: boolean
  messageStatus: MessageStatus
}
