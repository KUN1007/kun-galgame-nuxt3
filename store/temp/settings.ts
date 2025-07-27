import type { TempSettingStore } from '~/store/types/settings'

export const useTempSettingStore = defineStore('tempSetting', {
  persist: false,
  state: (): TempSettingStore => ({
    showKUNGalgameHamburger: false,
    showKUNGalgamePanel: false,
    showKUNGalgameUserPanel: false,
    showKUNGalgameMessageBox: false,

    messageStatus: 'offline'
  }),

  actions: {
    reset() {
      this.showKUNGalgameHamburger = false
      this.showKUNGalgamePanel = false
      this.showKUNGalgameUserPanel = false
      this.showKUNGalgameMessageBox = false
    }
  }
})
