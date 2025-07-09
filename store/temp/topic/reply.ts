import type {
  ReplyStoreTemp,
  SuccessfulReplyEvent
} from '~/store/types/topic/reply'
import type { TopicReply } from '~/types/api/topic-reply'

export const useTempReplyStore = defineStore('tempTopicReply', {
  persist: false,
  state: (): ReplyStoreTemp => ({
    isEdit: false,
    isScrollToTop: false,
    scrollToReplyId: -1,
    isReplyRewriting: false,
    replyRewrite: null,
    lastSuccessfulReply: null
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
    },

    setSuccessfulReply(event: SuccessfulReplyEvent) {
      this.lastSuccessfulReply = event
    },

    clearSuccessfulReply() {
      this.lastSuccessfulReply = null
    }
  }
})
