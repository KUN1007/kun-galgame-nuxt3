import { defineStore } from 'pinia'
import type { MessageStore } from '../types/message'

export const useTempMessageStore = defineStore({
  id: 'tempMessage',
  persist: false,
  state: (): MessageStore => ({
    showInfo: false,
    infoMsg: '',
    infoTranslateParams: '',
    durations: 0,

    showAlert: false,
    alertMsg: '',
    isShowCancel: false,
    confirm: false,

    isShowCapture: false,
    isCaptureSuccessful: false,
  }),
  getters: {},
  actions: {
    info(infoMsg: string, infoTranslateParams?: string, durations?: number) {
      this.showInfo = true
      this.infoMsg = infoMsg
      this.infoTranslateParams = infoTranslateParams ?? ''
      this.durations = durations ?? 3000
    },

    alert(alertMsg: string, isShowCancel: boolean): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        this.showAlert = true
        this.alertMsg = alertMsg
        this.isShowCancel = isShowCancel

        this.handleClose = () => resolve(false)

        this.handleConfirm = () => resolve(true)
      })
    },

    handleClose() {},
    handleConfirm() {},
  },
})
