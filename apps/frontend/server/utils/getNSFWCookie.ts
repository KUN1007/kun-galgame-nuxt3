import type { H3Event } from 'h3'
import type { KUNGalgameSettingsStore } from '~/store/types/settings'

export const getNSFWCookie = (event: H3Event) => {
  const settingsString = getCookie(event, 'KUNGalgameSettings')

  if (!settingsString) {
    return 'sfw'
  }

  const settings = JSON.parse(settingsString) as KUNGalgameSettingsStore

  return settings.showKUNGalgameContentLimit as 'sfw' | 'nsfw'
}
