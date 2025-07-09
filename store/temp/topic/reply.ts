import type { ReplyStoreTemp } from '~/store/types/topic/reply'
import type { TopicReply } from '~/types/api/topic-reply'

export const useTempReplyStore = defineStore('tempTopicReply', {
  persist: false,
  state: (): ReplyStoreTemp => ({
    isEdit: false,
    isScrollToTop: false,
    scrollToReplyId: -1,
    isReplyRewriting: false,
    replyRewrite: null,
    tempReply: []
  }),
  actions: {
    setRewriteData(reply: TopicReply) {
      this.isReplyRewriting = true
      this.replyRewrite = {
        id: reply.id,
        mainContent: reply.contentMarkdown,
        targets: reply.targets.map((t) => ({
          targetReplyId: t.id,
          targetFloor: t.floor,
          targetUserName: t.user.name,
          content: t.replyContentMarkdown
        }))
      }
    },

    resetRewriteReplyData() {
      this.replyRewrite = null
      this.isReplyRewriting = false
    }
  }
})
