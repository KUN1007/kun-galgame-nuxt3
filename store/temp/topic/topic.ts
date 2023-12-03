import { defineStore } from 'pinia'

import {
  getTopicByTidApi,
  getRelatedTopicsByTagsApi,
  getPopularTopicsByUserUidApi,
  updateTopicUpvoteApi,
  updateTopicLikeApi,
  updateTopicDislikeApi,
} from '@/api'

import type {
  TopicDetailResponseData,
  TopicAsideOtherTagRequestData,
  TopicAsideMasterRequestData,
  TopicAsideResponseData,
  TopicUpvoteTopicRequestData,
  TopicUpvoteTopicResponseData,
  TopicLikeTopicRequestData,
  TopicLikeTopicResponseData,
  TopicDislikeTopicRequestData,
  TopicDislikeTopicResponseData,
} from '@/api'

export const useTempTopicStore = defineStore({
  id: 'tempTopic',
  persist: false,
  actions: {
    // Other topics under the same tag on the left
    async getRelatedTopicsByTags(
      request: TopicAsideOtherTagRequestData
    ): Promise<TopicAsideResponseData> {
      return await getRelatedTopicsByTagsApi(request)
    },

    // Other topics by the master
    async getPopularTopicsByUserUid(
      request: TopicAsideMasterRequestData
    ): Promise<TopicAsideResponseData> {
      return await getPopularTopicsByUserUidApi(request)
    },

    // Get a single topic
    async getTopicByTid(tid: number): Promise<TopicDetailResponseData> {
      return await getTopicByTidApi(tid)
    },

    // Upvote a topic
    async updateTopicUpvote(
      tid: number,
      toUid: number
    ): Promise<TopicUpvoteTopicResponseData> {
      const requestData: TopicUpvoteTopicRequestData = {
        tid: tid,
        to_uid: toUid,
        time: Date.now(),
      }
      return await updateTopicUpvoteApi(requestData)
    },

    // Like a topic
    async updateTopicLike(
      tid: number,
      toUid: number,
      isPush: boolean
    ): Promise<TopicLikeTopicResponseData> {
      const requestData: TopicLikeTopicRequestData = {
        tid: tid,
        to_uid: toUid,
        isPush: isPush,
      }
      return await updateTopicLikeApi(requestData)
    },

    // Dislike a topic
    async updateTopicDislike(
      tid: number,
      toUid: number,
      isPush: boolean
    ): Promise<TopicDislikeTopicResponseData> {
      const requestData: TopicDislikeTopicRequestData = {
        tid: tid,
        to_uid: toUid,
        isPush: isPush,
      }
      return await updateTopicDislikeApi(requestData)
    },
  },
})
