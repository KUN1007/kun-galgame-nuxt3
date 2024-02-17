import type { ReplyStorePersist } from '~/store/types/topic/reply'

export const usePersistKUNGalgameReplyStore = defineStore({
  id: 'KUNGalgameReply',
  persist: true,
  state: (): ReplyStorePersist => ({
    isShowHotKeywords: false,

    editorHeight: 200,
    textCount: 0,

    replyDraft: {
      tid: 0,
      toUserName: '',
      toUid: 0,
      content: '',
      tags: [],
      toFloor: 0,
    },
  }),
  actions: {
    resetReplyDraft() {
      this.textCount = 0

      this.replyDraft.tid = 0
      this.replyDraft.toUserName = ''
      this.replyDraft.toUid = 0
      this.replyDraft.content = ''
      this.replyDraft.tags = []
      this.replyDraft.toFloor = 0
    },

    resetReplyContent() {
      this.textCount = 0

      this.replyDraft.content = ''
      this.replyDraft.tags = []
    },
  },
})
