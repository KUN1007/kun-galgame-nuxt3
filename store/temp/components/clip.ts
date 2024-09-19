import { defineStore } from 'pinia'
import type { KunClipStore } from '~/store/types/components/clip'

export const useComponentClipStore = defineStore({
  id: 'tempComponentClip',
  persist: false,
  state: (): KunClipStore => ({
    imageBlob: null,
    isShowClipper: false
  }),
  getters: {},
  actions: {
    clip(imageBlob: Blob): Promise<{ imageBlob?: Blob }> {
      return new Promise((resolve) => {
        this.imageBlob = imageBlob
        this.isShowClipper = true

        this.handleClose = () => resolve({})

        this.handleConfirm = (imageBlob: Blob) => {
          resolve({ imageBlob })
        }
      })
    },

    handleClose() {},
    handleConfirm(tempImage: Blob | null) {
      this.imageBlob = tempImage
    }
  }
})
