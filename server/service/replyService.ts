/*
 * 回复的 CRUD，定义了一些对回复数据的数据库交互操作
 */
import ReplyModel from '@/models/replyModel'
import UserModel from '@/models/userModel'
import TopicModel from '@/models/topicModel'
import TagService from './tagService'
import UserService from './userService'
import mongoose from '@/db/connection'

import type { sortField, sortOrder } from './types/replyService'

class ReplyService {
  // 创建回复
  async createReply(
    tid: number,
    r_uid: number,
    to_uid: number,
    to_floor: number,
    tags: string[],
    content: string,
    time: number
  ) {
    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      // 获取楼层数，以楼主话题的一楼为基准
      const maxFloorReply = await ReplyModel.findOne({ tid })
        .sort('-floor')
        .lean()
      const baseFloor = maxFloorReply ? maxFloorReply.floor : 0
      const floor = baseFloor + 1

      const newReply = new ReplyModel({
        tid,
        r_uid,
        to_uid,
        to_floor,
        floor,
        tags: tags,
        content,
        time,
      })

      const savedReply = await newReply.save()

      // 在用户的回复数组里保存回复，这里只是保存，没有撤销操作，所以是 true
      const replyUser = await UserModel.findOneAndUpdate(
        { uid: savedReply.r_uid },
        { $addToSet: { reply: savedReply.rid } }
      )

      // 更新被回复用户的萌萌点
      const replyToUser = await UserModel.findOneAndUpdate(
        { uid: savedReply.to_uid },
        { $inc: { moemoepoint: 2 } }
      )

      // 更新话题的 rid 数组
      // 话题的热度增加 5 点
      // 更新话题的 rid 数组，更新话题的回复计数
      await TopicModel.updateOne(
        { tid },
        {
          $addToSet: { replies: savedReply.rid },
          $inc: { popularity: 5, replies_count: 1 },
        }
      )

      // 保存 tags
      await TagService.createTagsByTidAndRid(tid, savedReply.rid, tags, [])

      // 提交事务
      await session.commitTransaction()
      session.endSession()

      // 返回的数据格式与 getReplies 相同
      const responseData = {
        rid: savedReply.rid,
        tid: savedReply.tid,
        floor: savedReply.floor,
        to_floor: savedReply.to_floor,
        r_user: {
          uid: replyUser.uid,
          name: replyUser.name,
          avatar: replyUser.avatar,
          moemoepoint: replyUser.moemoepoint,
        },
        to_user: {
          uid: replyToUser.uid,
          name: replyToUser.name,
        },
        edited: savedReply.edited,
        content: savedReply.content,
        upvotes: savedReply.upvotes,
        upvote_time: savedReply.upvote_time,
        likes: savedReply.likes,
        dislikes: savedReply.dislikes,
        tags: savedReply.tags,
        time: savedReply.time,
        comment: savedReply.comment,
      }

      return responseData
    } catch (error) {
      // 如果出现错误，回滚事务
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }

  // 更新回复
  async updateReply(
    uid: number,
    tid: number,
    rid: number,
    content: string,
    tags: string[],
    edited: number
  ) {
    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      // 直接用 rid 也可以，这里是保险起见
      await ReplyModel.updateOne(
        { rid: rid, r_uid: uid },
        { tags, edited, content }
      )

      // 保存 tags
      await TagService.updateTagsByTidAndRid(tid, rid, tags, [])

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

  // 推回复，推回复不可以取消
  /**
   * @param {number} uid - 推回复用户的 uid
   * @param {number} to_uid - 被推用户的 uid
   * @param {number} rid - 回复的 rid
   */
  async updateReplyUpvote(
    uid: number,
    to_uid: number,
    rid: number,
    time: number
  ): Promise<void> {
    // 用户无法推自己的回复
    if (uid === to_uid) {
      return
    }

    // 查找推回复用户的萌萌点
    const moemoepoint = await UserService.getUserInfoByUid(uid, ['moemoepoint'])
    // 用户的萌萌点 < 1100 无法使用推回复功能
    if (moemoepoint.moemoepoint < 1100) {
      return
    }

    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // 更新回复的被推时间，将用户的 uid 放进回复的被推数组中
      await ReplyModel.updateOne(
        { rid },
        {
          $set: { upvote_time: time },
          $push: { upvotes: uid },
        }
      )

      // 扣除推回复用户的萌萌点
      await UserModel.updateOne({ uid }, { $inc: { moemoepoint: -3 } })

      // 更新被推用户的萌萌点和被推数
      await UserModel.updateOne(
        { to_uid },
        { $inc: { moemoepoint: 1, upvote: 1 } }
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

  // 点赞回复
  /**
   * @param {number} uid - 点赞用户的 uid
   * @param {number} to_uid - 被点赞用户的 uid
   * @param {number} rid - 回复的 rid
   * @param {boolean} isPush - 点赞还是取消点赞
   */
  async updateReplyLike(
    uid: number,
    to_uid: number,
    rid: number,
    isPush: boolean
  ): Promise<void> {
    if (uid === to_uid) {
      return
    }

    const moemoepointAmount = isPush ? 1 : -1

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      await ReplyModel.updateOne(
        { rid: rid },
        { [isPush ? '$addToSet' : '$pull']: { likes: uid } },
        { $inc: { likes_count: moemoepointAmount } }
      )

      // 更新被点赞用户的萌萌点
      // 更新被点赞用户的被点赞数
      await UserModel.updateOne(
        { uid: to_uid },
        { $inc: { moemoepoint: moemoepointAmount, like: moemoepointAmount } }
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

  // 点踩回复
  /**
   * @param {number} uid - 点踩用户的 uid
   * @param {number} to_uid - 被点踩用户的 uid
   * @param {number} rid - 回复的 rid
   * @param {boolean} isPush - 点踩还是取消点踩
   */
  async updateReplyDislike(
    uid: number,
    to_uid: number,
    rid: number,
    isPush: boolean
  ): Promise<void> {
    if (uid === to_uid) {
      return
    }

    const amount = isPush ? 1 : -1

    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      await ReplyModel.updateOne(
        { rid: rid },
        { [isPush ? '$addToSet' : '$pull']: { dislikes: uid } }
      )

      // 更新被点踩用户的被踩数
      await UserModel.updateOne({ uid: to_uid }, { $inc: { dislike: amount } })

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

  // 获取某个话题下回复的接口，分页获取，懒加载，每次 3 条
  /**
   * @param {number} tid - 话题的 id，在那个话题中获取回复
   * @param {number} page - 分页的页数，第几页
   * @param {number} limit - 分页中每页有多少条信息
   * @param {sortField} sortField - 根据哪个字段进行排序
   * @param {sortOrder} sortOrder - 升序还是降序，`asc`, `desc`
   */
  async getReplies(
    tid: number,
    page: number,
    limit: number,
    sortField: sortField,
    sortOrder: sortOrder
  ) {
    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const replyId = (await TopicModel.findOne({ tid }).lean()).replies

      const skip = (page - 1) * limit

      const sortOptions: Record<string, 'asc' | 'desc'> = {
        [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
      }

      const replyDetails = await ReplyModel.find({ rid: { $in: replyId } })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate('r_user', 'uid avatar name moemoepoint')
        .populate('to_user', 'uid name')
        .lean()

      const responseData = replyDetails.map((reply) => ({
        rid: reply.rid,
        tid: reply.tid,
        floor: reply.floor,
        to_floor: reply.to_floor,
        r_user: {
          uid: reply.r_user[0].uid,
          name: reply.r_user[0].name,
          avatar: reply.r_user[0].avatar,
          moemoepoint: reply.r_user[0].moemoepoint,
        },
        to_user: {
          uid: reply.to_user[0].uid,
          name: reply.to_user[0].name,
        },
        edited: reply.edited,
        content: reply.content,
        upvotes: reply.upvotes,
        upvote_time: reply.upvote_time,
        likes: reply.likes,
        dislikes: reply.dislikes,
        tags: reply.tags,
        time: reply.time,
        comment: reply.comment,
      }))

      // 提交事务
      await session.commitTransaction()
      session.endSession()

      return responseData
    } catch (error) {
      // 如果出现错误，回滚事务
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }
}

export default new ReplyService()
