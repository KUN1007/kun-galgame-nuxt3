import { defineStore } from 'pinia'

import { postReplyByTidApi } from '@/api'

import type {
  TopicCreateReplyRequestData,
  TopicCreateReplyResponseData,
} from '@/api'

import { checkReplyPublish } from '@/store/utils/checkReplyPublish'
import type { ReplyStorePersist } from '@/store/types/topic/reply'

export const usePersistKUNGalgameReplyStore = defineStore({
  id: 'KUNGalgameReply',
  persist: true,
  state: (): ReplyStorePersist => ({
    replyPanelWidth: 90,

    isSaveReply: false,
    isShowHotKeywords: true,

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
    // Create a new reply
    async postNewReply(): Promise<TopicCreateReplyResponseData | undefined> {
      // The values here are used to initialize the reply
      const requestData: TopicCreateReplyRequestData = {
        tid: this.replyDraft.tid,
        to_uid: this.replyDraft.toUid,
        to_floor: this.replyDraft.toFloor,
        tags: this.replyDraft.tags,
        content: this.replyDraft.content,
        time: Date.now(),
      }

      if (!checkReplyPublish(requestData.tags, requestData.content)) {
        return
      }

      return await postReplyByTidApi(requestData)
    },

    // Reset reply draft to its original value, used for the reply publish button
    resetReplyDraft() {
      this.textCount = 0

      this.replyDraft.tid = 0
      this.replyDraft.toUserName = ''
      this.replyDraft.toUid = 0
      this.replyDraft.content = ''
      this.replyDraft.tags = []
      this.replyDraft.toFloor = 0

      this.isSaveReply = false
    },
  },
})
