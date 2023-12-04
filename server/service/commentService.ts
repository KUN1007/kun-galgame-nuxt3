/*
 * 评论的 CRUD，定义了一些对评论数据的数据库交互操作
 */

import TopicModel from '@/models/topicModel'
import ReplyModel from '@/models/replyModel'
import CommentModel from '@/models/commentModel'
import UserModel from '@/models/userModel'
import mongoose from '@/db/connection'

class CommentService {
  /**
   * 1. 收到评论的 rid, 话题的 tid, 评论人 id，被评论人 id，评论内容保存至新的评论 model
   * 2. 在评论者的 comment 数组中放入评论的 cid
   * 3. 将被评论人的 moemoepoint + 1
   * 4. 更新评论所在话题的热度 2 点
   * 5. 在回复的 comment 字段放入评论的 cid
   */
  // 创建一条评论
  async createComment(
    rid: number,
    tid: number,
    c_uid: number,
    to_uid: number,
    content: string
  ) {
    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const newComment = new CommentModel({
        rid,
        tid,
        c_uid,
        to_uid,
        content,
      })

      // 保存好的评论
      const savedComment = await newComment.save()

      const commentUser = await UserModel.findOneAndUpdate(
        {
          uid: c_uid,
        },
        { $addToSet: { comment: savedComment.cid } }
      )

      const toUser = await UserModel.findOneAndUpdate(
        {
          uid: to_uid,
        },
        { $inc: { moemoepoint: 1 } }
      )

      await TopicModel.updateOne(
        { tid },
        { $inc: { popularity: 2, comments: 1 } }
      )

      await ReplyModel.updateOne(
        { rid },
        { $addToSet: { comment: savedComment.cid } },
        { $inc: { comment_count: 1 } }
      )

      // 提交事务
      await session.commitTransaction()
      session.endSession()

      return {
        cid: savedComment.cid,
        rid: savedComment.rid,
        tid: savedComment.tid,
        c_user: {
          uid: commentUser.uid,
          name: commentUser.name,
          avatar: commentUser.avatar,
        },
        to_user: {
          uid: toUser.uid,
          name: toUser.name,
        },
        content: savedComment.content,
        likes: savedComment.likes,
        dislikes: savedComment.dislikes,
      }
    } catch (error) {
      // 如果出现错误，回滚事务
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }

  /**
   * 1. 将点赞用户的 uid 放入 comment model 的 likes 数组中
   * 2. 被点赞用户的 like 字段 + 1，moemoepoint + 1
   */
  // 点赞评论，点赞不可取消
  async updateCommentLike(cid: number, uid: number, to_uid: number) {
    // 用户不可以给自己点赞
    if (uid === to_uid) {
      return
    }

    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      await CommentModel.updateOne({ cid }, { $addToSet: { likes: uid } })
      await UserModel.updateOne(
        { uid: to_uid },
        { $inc: { like: 1, moemoepoint: 1 } }
      )

      // 提交事务
      await session.commitTransaction()
      session.endSession()
    } catch (error) {
      // 如果出现错误，回滚事务
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }

  /**
   * 1. 将点踩用户的 uid 放入 comment model 的 dislikes 数组中
   * 2. 被点踩用户的 dislike 字段 + 1
   */
  // 点踩评论，点踩不可取消
  async updateCommentDislike(cid: number, uid: number, to_uid: number) {
    // 用户不可以给自己点踩
    if (uid === to_uid) {
      return
    }

    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      await CommentModel.updateOne({ cid }, { $addToSet: { dislikes: uid } })
      await UserModel.updateOne({ uid: to_uid }, { $inc: { dislike: 1 } })

      // 提交事务
      await session.commitTransaction()
      session.endSession()
    } catch (error) {
      // 如果出现错误，回滚事务
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }

  // 根据回复的 rid 获取回复的所有评论
  async getCommentsByReplyRid(rid: number) {
    const comment = await CommentModel.find({ rid })
      .populate('cuid', 'uid avatar name')
      .populate('touid', 'uid name')
      .lean()

    // 返回回复下评论的所有数据
    const replyComments = comment.map((comment) => ({
      cid: comment.cid,
      rid: comment.rid,
      tid: comment.tid,
      c_user: {
        uid: comment.cuid[0].uid,
        avatar: comment.cuid[0].avatar,
        name: comment.cuid[0].name,
      },
      to_user: {
        uid: comment.touid[0].uid,
        name: comment.touid[0].name,
      },
      content: comment.content,
      likes: comment.likes,
      dislikes: comment.dislikes,
    }))

    return replyComments
  }
}

export default new CommentService()
