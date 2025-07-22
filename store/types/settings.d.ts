import type { MessageStatus } from '~/types/utils/message'
import type { OnlineUserCount } from '~/server/socket/socket'

export interface KUNGalgameSettingsStore {
  showKUNGalgamePageTransparency: number
  showKUNGalgameFontStyle: string
  showKUNGalgameContentLimit: string
  showKUNGalgameBackground: number
  showKUNGalgameBackgroundBlur: number
  showKUNGalgameBackgroundBrightness: number
  showKUNGalgameBackLoli: boolean
}

export interface TempSettingStore {
  showKUNGalgameHamburger: boolean
  showKUNGalgamePanel: boolean
  showKUNGalgameUserPanel: boolean

  showKUNGalgameMessageBox: boolean
  messageStatus: MessageStatus
  onlineCount: OnlineUserCount
}
