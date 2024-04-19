import type { TopicComment } from '~/store/types/topic/comment'

export const useTempCommentStore = defineStore({
  id: 'tempTopicComment',
  persist: false,
  state: (): TopicComment => ({
    rid: 0,
    toUid: 0,
    toUsername: '',
    content: '',

    isShowPanel: false
  }),
  actions: {}
})
