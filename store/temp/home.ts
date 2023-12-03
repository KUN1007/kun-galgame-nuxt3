import { defineStore } from 'pinia'
import { getHomeSearchTopicApi, getHomeTopicApi } from '@/api/index'
import type {
  HomeSearchTopicRequestData,
  HomeSearchTopicResponseData,
  HomeTopicRequestData,
  HomeTopicResponseData,
} from '@/api/index'
import type { HomeStoreTemp } from '../types/home'

export const useTempHomeStore = defineStore({
  id: 'tempHome',
  persist: false,
  state: (): HomeStoreTemp => ({
    search: {
      keywords: '',
      category: ['Galgame', 'Technique', 'Others'],
      page: 1,
      limit: 7,
      sortField: 'updated',
      sortOrder: 'desc',
      isLoading: true,
    },
    topic: {
      category: ['Galgame'],
      page: 1,
      limit: 17,
      sortField: 'updated',
      sortOrder: 'desc',
      isLoading: true,
    },

    isShowSearch: false,
  }),
  getters: {},
  actions: {
    async searchTopic(): Promise<HomeSearchTopicResponseData> {
      const requestData: HomeSearchTopicRequestData = {
        keywords: this.search.keywords.trim().slice(0, 40),
        category: JSON.stringify(this.search.category),
        page: this.search.page,
        limit: this.search.limit,
        sortField: this.search.sortField,
        sortOrder: this.search.sortOrder,
      }
      return await getHomeSearchTopicApi(requestData)
    },

    async getHomeTopic(): Promise<HomeTopicResponseData> {
      const requestData: HomeTopicRequestData = {
        category: JSON.stringify(this.topic.category),
        page: this.topic.page,
        limit: this.topic.limit,
        sortField: this.topic.sortField,
        sortOrder: this.topic.sortOrder,
      }
      return await getHomeTopicApi(requestData)
    },

    resetSearchStatus() {
      this.search.page = 1
      this.search.limit = 7
      this.search.isLoading = true
    },

    resetHomePageStatus() {
      this.topic.category = ['Galgame']
      this.topic.page = 1
      this.topic.limit = 17
      this.topic.sortField = 'updated'
      this.topic.sortOrder = 'desc'
      this.topic.isLoading = true
    },
  },
})
