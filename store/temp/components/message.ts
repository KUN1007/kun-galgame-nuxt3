import { defineStore } from 'pinia'
import type { MessageStore } from '~/store/types/components/message'

export const useComponentMessageStore = defineStore('tempComponentMessage', {
  persist: false,
  state: (): MessageStore => ({
    showAlert: false,
    alertTitle: '',
    alertMsg: '',
    isShowCancel: false,

    isShowCapture: false,
    isCaptureSuccessful: false,

    codeSalt: ''
  }),
  getters: {},
  actions: {
    alert(
      alertTitle?: string,
      alertMsg?: string,
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
