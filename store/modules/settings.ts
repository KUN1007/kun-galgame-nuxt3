import type { KUNGalgameSettingsStore } from '../types/settings'

export const useKUNGalgameSettingsStore = defineStore({
  id: 'KUNGalgameSettings',
  persist: {
    storage: persistedState.cookies,
  },
  state: (): KUNGalgameSettingsStore => ({
    showKUNGalgamePageWidth: {
      KUN: 90,
      Topic: 90,
      Edit: 90,
      KUNGalgame: 90,
      Pool: 90,
      Bylaw: 90,
      Technique: 90,
      ThanksList: 90,
    },
    showKUNGalgameFontStyle: 'system-ui',
    showKUNGalgameBackground: 'none',
    showKUNGalgameCustomBackground: '',

    isShowPageWidth: true,
  }),
  actions: {
    // Set the font style, allowing users to set their own
    // , with the default as system UI
    setKUNGalgameFontStyle(font: string) {
      this.showKUNGalgameFontStyle = font
      document.documentElement.style.fontFamily = font
    },
    // Reset all settings; because it interacts with the document
    // , Pinia reactivity is not effective
    setKUNGalgameSettingsRecover() {
      this.$reset()
      this.setKUNGalgameFontStyle('system-ui')
    },
  },
})
