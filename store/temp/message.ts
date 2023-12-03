import { defineStore } from 'pinia'

// Type of message store
import { MessageStore } from '../types/message'

export const useTempMessageStore = defineStore({
  id: 'tempMessage',
  // No need to persist any message components
  persist: false,
  state: (): MessageStore => ({
    showInfo: false,
    showAlert: false,
    infoMsg: '',
    alertMsg: '',
    isShowCancel: false,
    confirm: false,
    isShowCapture: false,
    isCaptureSuccessful: false,
  }),
  getters: {},
  actions: {
    info(infoMsg: string) {
      this.showInfo = true
      this.infoMsg = infoMsg
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
