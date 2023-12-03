import { defineStore } from 'pinia'
import type { CommentDraft } from '@/store/types/topic/comment'

// Comments
import {
  getCommentsByReplyRidApi,
  updateCommentLikeApi,
  updateCommentDislikeApi,
  postCommentByPidAndRidApi,
} from '@/api'

import type {
  TopicCommentResponseData,
  TopicLikeCommentRequestData,
  TopicLikeCommentResponseData,
  TopicDislikeCommentRequestData,
  TopicDislikeCommentResponseData,
  TopicCreateCommentRequestData,
  TopicCreateCommentResponseData,
} from '@/api'

export const useTempCommentStore = defineStore({
  id: 'tempComment',
  // Not persistent
  persist: false,
  state: (): CommentDraft => ({
    tid: 0,
    rid: 0,
    toUid: 0,
    toUsername: '',
    content: '',

    // Which reply's comment panel to display
    isShowCommentPanelRid: 0,
  }),
  actions: {
    // Get comments
    async getComments(
      tid: number,
      rid: number
    ): Promise<TopicCommentResponseData> {
      return await getCommentsByReplyRidApi(tid, rid)
    },

    // Like a comment
    async updateCommentLike(
      tid: number,
      cid: number,
      toUid: number
    ): Promise<TopicLikeCommentResponseData> {
      const requestData: TopicLikeCommentRequestData = {
        tid: tid,
        cid: cid,
        to_uid: toUid,
      }
      return await updateCommentLikeApi(requestData)
    },

    // Dislike a comment
    async updateCommentDislike(
      tid: number,
      cid: number,
      toUid: number
    ): Promise<TopicDislikeCommentResponseData> {
      const requestData: TopicDislikeCommentRequestData = {
        tid: tid,
        cid: cid,
        to_uid: toUid,
      }
      return await updateCommentDislikeApi(requestData)
    },

    // Create a new comment
    async postNewComment(
      tid: number,
      rid: number,
      toUid: number,
      content: string
    ): Promise<TopicCreateCommentResponseData> {
      const requestData: TopicCreateCommentRequestData = {
        tid: tid,
        rid: rid,
        to_uid: toUid,
        content: content,
      }
      return await postCommentByPidAndRidApi(requestData)
    },
  },
})
