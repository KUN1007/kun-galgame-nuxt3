import { Context } from 'koa'
import CommentService from '@/service/commentService'
// 操作 cookie 的函数
import { getCookieTokenInfo } from '@/utils/cookies'

import { checkCommentPublish } from './utils/checkCommentPublish'

class CommentController {
  // 发布单条评论
  async createComment(ctx: Context) {
    try {
      // 从路径获取 tid
      const tid = parseInt(ctx.params.tid as string)

      const { rid, to_uid, content } = ctx.request.body

      // 再次检测评论发布
      const result = checkCommentPublish(content)
      if (result) {
        ctx.app.emit('kunError', result, ctx)
        return
      }

      // 从 cookie 获取当前用户的 uid
      const c_uid = getCookieTokenInfo(ctx).uid

      const ridNumber = parseInt(rid.toString())
      const toUidNumber = parseInt(to_uid.toString())
      const newComment = await CommentService.createComment(
        ridNumber,
        tid,
        c_uid,
        toUidNumber,
        content.toString()
      )

      ctx.body = {
        code: 200,
        message: 'Comment created successfully',
        data: newComment,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to create comment' }
    }
  }

  // 点赞评论
  async updateCommentLike(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid

    const cid = parseInt(ctx.query.cid as string)
    const to_uid = parseInt(ctx.query.to_uid as string)
    await CommentService.updateCommentLike(cid, uid, to_uid)
    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  // 点踩评论
  async updateCommentDislike(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid

    const cid = parseInt(ctx.query.cid as string)
    const to_uid = parseInt(ctx.query.to_uid as string)
    await CommentService.updateCommentDislike(cid, uid, to_uid)
    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  // 根据回复的 rid 获取回复下面的所有评论
  async getCommentsByReplyRid(ctx: Context) {
    try {
      const rid = parseInt(ctx.query.rid as string)
      const comments = await CommentService.getCommentsByReplyRid(rid)
      ctx.body = {
        code: 200,
        message: 'OK',
        data: comments,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to fetch comments' }
    }
  }
}

export default new CommentController()
