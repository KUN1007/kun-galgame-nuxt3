import type { MessageStatus } from '~/types/utils/message'

export interface KUNGalgameSettingsStore {
  showKUNGalgamePageTransparency: number
  showKUNGalgameFontStyle: string
  showKUNGalgameBackground: number
  showKUNGalgameBackgroundBlur: number
  showKUNGalgameBackLoli: boolean
}

export interface TempSettingStore {
  showKUNGalgameHamburger: boolean
  showKUNGalgamePanel: boolean
  showKUNGalgameUserPanel: boolean

  showKUNGalgameMessageBox: boolean
  messageStatus: MessageStatus
}
