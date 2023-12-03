import { defineStore } from 'pinia'

import { updateNewTopicApi } from '@/api'

import type {
  EditUpdateTopicRequestData,
  EditUpdateTopicResponseData,
} from '@/api'

import { checkTopicPublish } from '@/store/utils/checkTopicPublish'
import { EditStoreTemp } from '@/store/types/edit'

export const useTempEditStore = defineStore({
  id: 'tempEdit',
  persist: false,
  state: (): EditStoreTemp => ({
    tid: 0,
    title: '',
    content: '',
    tags: [],
    category: [],

    textCount: 0,
    isTopicRewriting: false,
  }),
  actions: {
    // Update a topic
    async rewriteTopic(): Promise<EditUpdateTopicResponseData | undefined> {
      const requestData: EditUpdateTopicRequestData = {
        tid: this.tid,
        title: this.title,
        content: this.content,
        tags: this.tags,
        category: this.category,
        edited: Date.now(),
      }

      // If the topic data is invalid, return directly
      if (!checkTopicPublish(this.textCount, requestData)) {
        return
      }

      return await updateNewTopicApi(requestData)
    },

    // Reset data for re-editing a topic
    resetRewriteTopicData() {
      this.textCount = 0
      this.title = ''
      this.content = ''
      this.tags = []
      this.category = []

      this.isTopicRewriting = false
    },
  },
})
