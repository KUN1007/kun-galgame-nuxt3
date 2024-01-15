import type { TempSettingStore } from '~/store/types/settings'

export const useTempSettingStore = defineStore({
  id: 'tempSetting',
  persist: false,
  state: (): TempSettingStore => ({
    showKUNGalgameHamburger: false,
    showKUNGalgamePanel: false,
    showKUNGalgameUserPanel: false,

    showKUNGalgameMessageBox: false,
  }),
})
