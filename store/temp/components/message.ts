import { defineStore } from 'pinia'
import type { MessageStore } from '~/store/types/components/message'

export const useComponentMessageStore = defineStore({
  id: 'tempComponentMessage',
  persist: false,
  state: (): MessageStore => ({
    showInfo: false,
    infoMsg: '',
    infoTranslateParams: '',
    durations: 0,

    showAlert: false,
    alertTitle: {
      'en-us': '',
      'ja-jp': '',
      'zh-cn': '',
      'zh-tw': ''
    },
    alertMsg: {
      'en-us': '',
      'ja-jp': '',
      'zh-cn': '',
      'zh-tw': ''
    },
    isShowCancel: false,

    isShowCapture: false,
    isCaptureSuccessful: false
  }),
  getters: {},
  actions: {
    info(infoMsg: string, infoTranslateParams?: string, durations?: number) {
      this.showInfo = true
      this.infoMsg = infoMsg
      this.infoTranslateParams = infoTranslateParams ?? ''
      this.durations = durations ?? 3000
    },

    alert(
      alertTitle?: KunLanguage,
      alertMsg?: KunLanguage,
      isShowCancel?: boolean
    ): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        this.showAlert = true
        this.alertTitle = alertTitle
        this.alertMsg = alertMsg
        this.isShowCancel = isShowCancel

        this.handleClose = () => resolve(false)

        this.handleConfirm = () => resolve(true)
      })
    },

    handleClose() {},
    handleConfirm() {}
  }
})
