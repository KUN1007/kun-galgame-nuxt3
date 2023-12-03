import { defineStore } from 'pinia'
import { postNewTopicApi, getTopTagsApi } from '@/api'
import {
  EditCreateTopicRequestData,
  EditCreateTopicResponseData,
  EditGetHotTagsRequestData,
  EditGetHotTagsResponseData,
} from '@/api'

import { checkTopicPublish } from '../utils/checkTopicPublish'
import type { EditStorePersist } from '../types/edit'

export const useKUNGalgameEditStore = defineStore({
  id: 'KUNGalgameEdit',
  persist: true,
  state: (): EditStorePersist => ({
    editorHeight: 300,
    textCount: 0,

    title: '',
    content: '',
    tags: [],
    category: [],
    isShowHotKeywords: true,
    isSaveTopic: false,
  }),
  getters: {},
  actions: {
    // Create a new topic
    async createNewTopic(): Promise<EditCreateTopicResponseData | undefined> {
      // Data for the current topic
      const requestData: EditCreateTopicRequestData = {
        title: this.title,
        content: this.content,
        time: Date.now(),
        tags: this.tags,
        category: this.category,
      }
      // If the topic data is invalid, return directly
      if (!checkTopicPublish(this.textCount, requestData)) {
        return
      }
      // If valid, make an API request to publish the topic
      return await postNewTopicApi(requestData)
    },

    // Get popular tags
    async getHotTags(limit: number): Promise<EditGetHotTagsResponseData> {
      const requestData: EditGetHotTagsRequestData = { limit }
      return await getTopTagsApi(requestData)
    },

    // Reset topic draft data for publishing
    resetTopicData() {
      this.textCount = 0

      this.title = ''
      this.content = ''
      this.tags = []
      this.category = []

      this.isSaveTopic = false
    },
  },
})
