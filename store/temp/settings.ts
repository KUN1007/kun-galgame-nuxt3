import type { TempSettingStore } from '~/store/types/settings'

export const useTempSettingStore = defineStore('tempSetting', {
  persist: false,
  state: (): TempSettingStore => ({
    showKUNGalgameHamburger: false,
    showKUNGalgamePanel: false,
    showKUNGalgameUserPanel: false,
    showKUNGalgameMessageBox: false,

    messageStatus: 'offline',
    onlineCount: { total: 0, user: 0, guest: 0 }
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
