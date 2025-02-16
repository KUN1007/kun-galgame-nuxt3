import type { ReplyStoreTemp } from '~/store/types/topic/reply'

export const useTempReplyStore = defineStore('tempTopicReply', {
  persist: false,
  state: (): ReplyStoreTemp => ({
    textCount: 0,
    isEdit: false,
    isScrollToTop: false,
    scrollToReplyId: -1,
    isReplyRewriting: false,

    replyRewrite: [],
    tempReply: []
  }),
  actions: {
    resetRewriteReplyData() {
      this.replyRewrite = []
      this.isReplyRewriting = false
    }
  }
})
