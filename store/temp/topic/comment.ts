import type { TopicComment } from '~/store/types/topic/comment'

export const useTempCommentStore = defineStore('tempTopicComment', {
  persist: false,
  state: (): TopicComment => ({
    replyId: 0,
    targetUserId: 0,
    targetUsername: '',
    content: '',

    isShowPanel: false
  }),
  actions: {}
})
