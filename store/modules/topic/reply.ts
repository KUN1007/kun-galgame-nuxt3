import type { ReplyStorePersist } from '~/store/types/topic/reply'

export const usePersistKUNGalgameReplyStore = defineStore(
  'KUNGalgameTopicReply',
  {
    persist: true,
    state: (): ReplyStorePersist => ({
      mode: 'preview',
      replyDraft: {
        toUserName: '',
        toUid: 0,
        content: '',
        tags: [],
        toFloor: 0
      }
    }),
    actions: {
      resetReplyDraft() {
        this.replyDraft.toUserName = ''
        this.replyDraft.toUid = 0
        this.replyDraft.content = ''
        this.replyDraft.tags = []
        this.replyDraft.toFloor = 0
      },

      resetReplyContent() {
        this.replyDraft.content = ''
        this.replyDraft.tags = []
      }
    }
  }
)
