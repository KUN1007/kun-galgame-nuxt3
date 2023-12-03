import { defineStore } from 'pinia'

import {
  getRepliesByTidApi,
  updateReplyUpvoteApi,
  updateReplyLikeApi,
  updateReplyDislikeApi,
  updateReplyApi,
} from '@/api'

import type {
  TopicReplyRequestData,
  TopicReplyResponseData,
  TopicUpvoteReplyRequestData,
  TopicUpvoteReplyResponseData,
  TopicLikeReplyRequestData,
  TopicLikeReplyResponseData,
  TopicDislikeReplyRequestData,
  TopicDislikeReplyResponseData,
  TopicUpdateReplyRequestData,
  TopicUpdateReplyResponseData,
} from '@/api'

import { checkReplyPublish } from '@/store/utils/checkReplyPublish'
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
    // Get replies
    async getReplies(tid: number): Promise<TopicReplyResponseData> {
      // The default values here are used for initialization
      const requestData: TopicReplyRequestData = {
        tid: tid,
        page: this.replyRequest.page,
        limit: this.replyRequest.limit,
        sortField: this.replyRequest.sortField || 'floor',
        sortOrder: this.replyRequest.sortOrder || 'desc',
      }
      return await getRepliesByTidApi(requestData)
    },

    // Upvote a reply
    async updateReplyUpvote(
      tid: number,
      toUid: number,
      rid: number
    ): Promise<TopicUpvoteReplyResponseData> {
      const requestData: TopicUpvoteReplyRequestData = {
        tid: tid,
        to_uid: toUid,
        rid: rid,
        time: Date.now(),
      }
      return await updateReplyUpvoteApi(requestData)
    },

    // Like a reply
    async updateReplyLike(
      tid: number,
      toUid: number,
      rid: number,
      isPush: boolean
    ): Promise<TopicLikeReplyResponseData> {
      const requestData: TopicLikeReplyRequestData = {
        tid: tid,
        to_uid: toUid,
        rid: rid,
        isPush: isPush,
      }
      return await updateReplyLikeApi(requestData)
    },

    // Dislike a reply
    async updateReplyDislike(
      tid: number,
      toUid: number,
      rid: number,
      isPush: boolean
    ): Promise<TopicDislikeReplyResponseData> {
      const requestData: TopicDislikeReplyRequestData = {
        tid: tid,
        to_uid: toUid,
        rid: rid,
        isPush: isPush,
      }
      return await updateReplyDislikeApi(requestData)
    },

    // Update a reply
    async updateReply(): Promise<TopicUpdateReplyResponseData | undefined> {
      const requestData: TopicUpdateReplyRequestData = {
        tid: this.replyRewrite.tid,
        rid: this.replyRewrite.rid,
        content: this.replyRewrite.content,
        tags: this.replyRewrite.tags,
        edited: Date.now(),
      }

      if (!checkReplyPublish(requestData.tags, requestData.content)) {
        return
      }

      return await updateReplyApi(requestData)
    },

    // Reset data for re-editing a reply
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
