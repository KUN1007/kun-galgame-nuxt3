import Cookies from 'js-cookie'
import type { KUNGalgameSettingsStore } from '~/store/types/settings'

const cookieString = Cookies.get('KUNGalgameSettings')
const cookieSettings: KUNGalgameSettingsStore = cookieString
  ? JSON.parse(cookieString)
  : {}

export const KUNGalgameLanguage = (): 'en' | 'zh' => {
  return cookieSettings ? cookieSettings.showKUNGalgameLanguage : 'en'
}
