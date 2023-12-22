import type { ReplyStoreTemp } from '@/store/types/topic/reply'

export const useTempReplyStore = defineStore({
  id: 'tempReply',
  persist: false,
  state: (): ReplyStoreTemp => ({
    textCount: 0,
    isEdit: false,
    isScrollToTop: false,
    isLoading: true,

    scrollToReplyId: -1,
    isReplyRewriting: false,

    replyRequest: {
      page: 1,
      limit: 3,
      sortField: 'floor',
      sortOrder: 'asc',
    },

    replyRewrite: {
      tid: 0,
      rid: 0,
      content: '',
      tags: [],
      edited: 0,
    },

    tempReply: {
      rid: 0,
      tid: 0,
      floor: 0,
      to_floor: 0,

      r_user: {
        uid: 0,
        name: '',
        avatar: '',
        moemoepoint: 0,
      },
      to_user: {
        uid: 0,
        name: '',
      },
      edited: 0,
      content: '',
      upvotes: [],
      upvote_time: 0,
      likes: [],
      dislikes: [],
      tags: [],
      time: 0,
      comment: [],
    },

    tempReplyRewrite: { rid: 0, content: '', tags: [''], edited: 0 },
  }),
  actions: {
    resetRewriteReplyData() {
      this.replyRewrite.tid = 0
      this.replyRewrite.rid = 0
      this.replyRewrite.content = ''
      this.replyRewrite.tags = []

      this.isReplyRewriting = false
    },

    resetPageStatus() {
      this.replyRequest.page = 1
      this.isLoading = true
    },
  },
})
