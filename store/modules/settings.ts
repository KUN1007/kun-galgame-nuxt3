import type { KUNGalgameSettingsStore } from '../types/settings'

export const useKUNGalgameSettingsStore = defineStore({
  id: 'KUNGalgameSettings',
  persist: true,
  state: (): KUNGalgameSettingsStore => ({
    showKUNGalgamePageTransparency: 77,
    showKUNGalgameFontStyle: 'system-ui',
    showKUNGalgameBackground: 0
  }),
  actions: {
    // Set the font style, allowing users to set their own
    // , with the default as system UI
    setKUNGalgameFontStyle(font: string) {
      this.showKUNGalgameFontStyle = font
      document.documentElement.style.setProperty('--font-family', font)
    },
    // Set the page transparency
    setKUNGalgameTransparency(trans: number, mode: 'dark' | 'light') {
      this.showKUNGalgamePageTransparency = trans
      if (mode === 'light') {
        document.documentElement.style.setProperty(
          '--kungalgame-trans-white-5',
          `rgba(255, 255, 255, ${trans / 100})`
        )
      } else {
        document.documentElement.style.setProperty(
          '--kungalgame-trans-white-5',
          `rgba(15,37,61, ${trans / 100})`
        )
      }
    },
    // Reset all settings; because it interacts with the document
    // , Pinia reactivity is not effective
    async setKUNGalgameSettingsRecover() {
      this.$reset()
      this.setKUNGalgameFontStyle('system-ui')
      await deleteImage('kun-galgame-custom-bg')
    }
  }
})
