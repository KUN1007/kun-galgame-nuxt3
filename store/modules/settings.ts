import type { KUNGalgameSettingsStore } from '../types/settings'

export const useKUNGalgameSettingsStore = defineStore({
  id: 'KUNGalgameSettings',
  persist: true,
  state: (): KUNGalgameSettingsStore => ({
    showKUNGalgamePageWidth: {
      index: 90,
      topic: 90,
      edit: 90,
      kungalgame: 90,
      pool: 90,
      bylaw: 90,
      technique: 90,
      'thanks-list': 90,
    },
    showKUNGalgameFontStyle: 'system-ui',
    showKUNGalgameBackground: 0,

    isShowPageWidth: true,
  }),
  actions: {
    // Set the font style, allowing users to set their own
    // , with the default as system UI
    setKUNGalgameFontStyle(font: string) {
      this.showKUNGalgameFontStyle = font
      document.documentElement.style.setProperty('--font-family', font)
    },
    // Reset all settings; because it interacts with the document
    // , Pinia reactivity is not effective
    async setKUNGalgameSettingsRecover() {
      this.$reset()
      this.setKUNGalgameFontStyle('system-ui')
      await deleteImage('kun-galgame-custom-bg')
    },
  },
})
