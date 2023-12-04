import { Context } from 'koa'
import ReplyService from '@/service/replyService'
// 操作 cookie 的函数
import { getCookieTokenInfo } from '@/utils/cookies'

import { checkReplyPublish } from './utils/checkReplyPublish'
import { isValidTimestamp } from '@/utils/validate'

import type { sortField, sortOrder } from './types/replyController'

class ReplyController {
  // 创建回复
  async createReply(ctx: Context) {
    // 从 cookie 获取用户信息
    const r_uid = getCookieTokenInfo(ctx).uid

    // 从路径获取 tid
    const tid = parseInt(ctx.params.tid as string)

    const { to_uid, to_floor, tags, content, time } = ctx.request.body

    // 再次检查评论发布
    const result = checkReplyPublish(tags, content, time)

    if (result) {
      ctx.app.emit('kunError', result, ctx)
      return
    }

    const savedReply = await ReplyService.createReply(
      tid,
      r_uid,
      to_uid,
      to_floor,
      tags,
      content,
      time
    )

    ctx.status = 200
    ctx.body = ctx.body = {
      code: 200,
      message: 'OK',
      data: savedReply,
    }
  }

  // 更新回复
  async updateReply(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid
    // 从路径获取 tid
    const tid = parseInt(ctx.params.tid as string)

    const { rid, content, tags, edited } = ctx.request.body

    // 再次检查评论发布
    const result = checkReplyPublish(tags, content, edited)

    if (result) {
      ctx.app.emit('kunError', result, ctx)
      return
    }

    await ReplyService.updateReply(uid, tid, rid, content, tags, edited)
    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  // 推
  async updateReplyUpvote(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid

    const to_uid = parseInt(ctx.query.to_uid as string)
    const rid = parseInt(ctx.query.rid as string)
    const time = parseInt(ctx.query.time as string)

    if (!isValidTimestamp(time)) {
      ctx.app.emit('kunError', 10505, ctx)
      return
    }

    await ReplyService.updateReplyUpvote(uid, to_uid, rid, time)

    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  // 点赞
  async updateReplyLike(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid

    const to_uid = parseInt(ctx.query.to_uid as string)
    const rid = parseInt(ctx.query.rid as string)
    const isPush = ctx.query.isPush === 'true'

    await ReplyService.updateReplyLike(uid, to_uid, rid, isPush)

    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  // 点踩
  async updateReplyDislike(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid

    const to_uid = parseInt(ctx.query.to_uid as string)
    const rid = parseInt(ctx.query.rid as string)
    const isPush = ctx.query.isPush === 'true'

    await ReplyService.updateReplyDislike(uid, to_uid, rid, isPush)

    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  // 获取回复列表
  async getReplies(ctx: Context) {
    try {
      // 从路径获取 tid
      const tid = parseInt(ctx.params.tid as string)

      const pageNumber = parseInt(ctx.query.page as string)
      const limitNumber = parseInt(ctx.query.limit as string)
      const { sortField, sortOrder } = ctx.query

      const data = await ReplyService.getReplies(
        tid,
        pageNumber,
        limitNumber,
        sortField as sortField,
        sortOrder as sortOrder
      )

      ctx.body = {
        code: 200,
        message: 'OK',
        data,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to fetch replies' }
    }
  }
}

export default new ReplyController()
