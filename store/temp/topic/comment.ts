import type { CommentDraft } from '~/store/types/topic/comment'

export const useTempCommentStore = defineStore({
  id: 'tempTopicComment',
  persist: false,
  state: (): CommentDraft => ({
    tid: 0,
    rid: 0,
    toUid: 0,
    toUsername: '',
    content: '',

    isShowCommentPanelRid: 0
  }),
  actions: {}
})
