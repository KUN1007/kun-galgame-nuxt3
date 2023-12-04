/*
 * 话题的 CRUD，定义了一些对话题数据的数据库交互操作
 */

import TopicModel from '@/models/topicModel'
import UserModel from '@/models/userModel'
import TagService from './tagService'
import UserService from './userService'
import mongoose from '@/db/connection'

import type {
  SortField,
  SortOrder,
  SortFieldRanking,
  SortFieldPool,
} from './types/topicService'

class TopicService {
  /*
   * 编辑页面
   */

  // 创建话题，用于编辑界面
  async createTopic(
    title: string,
    content: string,
    time: number,
    tags: string[],
    category: string[],
    uid: number
  ) {
    // 获取用户今日发布话题的个数和萌萌点
    const user = await UserService.getUserInfoByUid(uid, [
      'daily_topic_count',
      'moemoepoint',
    ])

    // 这里是用户每日最多发布的话题数量，为萌萌点 / 10
    if (user.moemoepoint / 10 < user.daily_topic_count) {
      return 10201
    }

    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const newTopic = new TopicModel({
        title,
        content,
        time,
        tags,
        category,
        uid,
      })

      // 保存话题
      const savedTopic = await newTopic.save()

      // 在用户的话题数组里保存话题
      // 更新用户的今日发布话题计数，更新用户发表话题计数
      await UserModel.updateOne(
        { uid },
        {
          $addToSet: { topic: savedTopic.tid },
          $inc: { daily_topic_count: 1, topic_count: 1 },
        }
      )

      // 保存话题 tag
      await TagService.createTagsByTidAndRid(savedTopic.tid, 0, tags, category)

      // 提交事务
      await session.commitTransaction()
      session.endSession()

      // 返回创建好话题的 tid
      return savedTopic.tid
    } catch (error) {
      // 如果出现错误，回滚事务
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }

  // 更新话题（标题，内容，标签，分类）
  async updateTopic(
    uid: number,
    tid: number,
    title: string,
    content: string,
    tags: string[],
    category: string[],
    edited: number
  ) {
    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      // 直接根据 tid 更新也可以，这里是保险起见
      await TopicModel.updateOne(
        { tid, uid },
        { title, content, tags, category, edited }
      )

      // 使用 TagService 更新标签的使用次数
      await TagService.updateTagsByTidAndRid(tid, 0, tags, category)

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

  /*
   * 话题页面
   */

  // 根据 tid 获取单个话题信息
  async getTopicByTid(tid: number) {
    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const topic = await TopicModel.findOne({ tid }).lean()

      // 用户每次访问话题，增加 views 字段值
      await TopicModel.updateOne(
        { tid },
        { $inc: { views: 1, popularity: 0.1 } }
      )

      const userInfo = await UserService.getUserInfoByUid(topic.uid, [
        'uid',
        'avatar',
        'name',
        'moemoepoint',
      ])

      const data = {
        tid: topic.tid,
        title: topic.title,
        views: topic.views,
        likes: topic.likes,
        dislikes: topic.dislikes,
        time: topic.time,
        content: topic.content,
        upvotes: topic.upvotes,
        tags: topic.tags,
        edited: topic.edited,
        user: {
          uid: userInfo.uid,
          name: userInfo.name,
          avatar: userInfo.avatar,
          moemoepoint: userInfo.moemoepoint,
        },
        replies: topic.replies,
        status: topic.status,
        share: topic.share,
        category: topic.category,
        popularity: topic.popularity,
        upvote_time: topic.upvote_time,
      }

      // 提交事务
      await session.commitTransaction()
      session.endSession()

      return data
    } catch (error) {
      // 如果出现错误，回滚事务
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }

  // 楼主的其它话题，按热度
  async getPopularTopicsByUserUid(uid: number, tidToExclude: number) {
    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      // 查询用户信息
      const user = await UserService.getUserInfoByUid(uid, ['topic'])
      // 返回 5 条数据，不包括当前话题
      const popularTIDs = user.topic
      const popularTopics = await TopicModel.find({
        tid: { $in: popularTIDs, $ne: tidToExclude },
      })
        .sort({ popularity: -1 })
        .limit(5)
        .select('title tid')

      // 去除 _id，保留 title 和 tid 即可
      const topic = popularTopics.map((topic) => ({
        title: topic.title,
        tid: topic.tid,
      }))

      // 提交事务
      await session.commitTransaction()
      session.endSession()

      return topic
    } catch (error) {
      // 如果出现错误，回滚事务
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }

  // 相同标签下的其它话题，按热度
  async getRelatedTopicsByTags(tags: string[], tidToExclude: number) {
    const relatedTopics = await TopicModel.find({
      tags: { $in: tags },
      // 返回相同标签的话题中排除当前话题
      tid: { $ne: tidToExclude },
    })
      .sort({ popularity: -1 })
      .limit(5)
      .select('title tid')

    // 去除 _id，保留 title 和 tid 即可
    const topic = relatedTopics.map((topic) => ({
      title: topic.title,
      tid: topic.tid,
    }))

    return topic
  }

  // 推话题，推话题不可以取消
  /**
   * @param {number} uid - 推话题用户的 uid
   * @param {number} to_uid - 被推用户的 uid
   * @param {number} tid - 话题的 tid
   */
  async updateTopicUpvote(
    uid: number,
    to_uid: number,
    tid: number,
    time: number
  ): Promise<10202 | void> {
    // 用户无法推自己的话题
    if (uid === to_uid) {
      return
    }

    // 查找推话题用户的萌萌点
    const moemoepoint = await UserService.getUserInfoByUid(uid, ['moemoepoint'])

    // 用户的萌萌点 < 1100 无法使用推话题功能
    if (moemoepoint.moemoepoint < 1100) {
      return 10202
    }

    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // 更新话题被推的时间
      // 将用户的 uid 放进话题的 upvotes 数组中
      // 更新话题的热度，更新话题的被推数
      await TopicModel.updateOne(
        { tid },
        {
          $set: { upvote_time: time },
          $push: { upvotes: uid },
          $inc: { popularity: 50, upvotes_count: 1 },
        }
      )

      // 将话题的 tid 放进用户的 upvote_topic 数组中
      // 扣除推话题用户的萌萌点
      await UserModel.updateOne(
        { uid: uid },
        {
          $inc: { moemoepoint: -17, upvote_topic_count: 1 },
          $addToSet: {
            upvote_topic: tid,
          },
        }
      )

      // 更新被推用户的萌萌点和被推数
      await UserModel.updateOne(
        { uid: to_uid },
        { $inc: { moemoepoint: 7, upvote: 1 } }
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

  // 点赞话题
  /**
   * @param {number} uid - 点赞用户的 uid
   * @param {number} to_uid - 被点赞用户的 uid
   * @param {number} tid - 话题的 tid
   * @param {boolean} isPush - 点赞还是取消点赞
   */
  async updateTopicLike(
    uid: number,
    to_uid: number,
    tid: number,
    isPush: boolean
  ): Promise<void> {
    // 不允许用户自己给自己点赞
    if (uid === to_uid) {
      return
    }

    // 萌萌点，取消则 -1， 否则为 1
    const moemoepointAmount = isPush ? 1 : -1
    // 热度
    const popularity = isPush ? 2 : -2

    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // 将用户的 uid 作用于话题的 likes 数组中
      // 更新话题的热度和点赞计数
      await TopicModel.updateOne(
        { tid: tid },
        {
          $inc: { popularity: popularity, likes_count: moemoepointAmount },
          [isPush ? '$addToSet' : '$pull']: { likes: uid },
        }
      )

      // 将话题的 tid 作用于用户的 like_topic 数组中
      // 增加用户的点赞计数
      await UserModel.updateOne(
        { uid: uid },
        { [isPush ? '$addToSet' : '$pull']: { like_topic: tid } }
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

  // 点踩话题
  /**
   * @param {number} uid - 点踩用户的 uid
   * @param {number} to_uid - 被点踩用户的 uid
   * @param {number} tid - 话题的 tid
   * @param {boolean} isPush - 点踩还是取消点踩
   */
  async updateTopicDislike(
    uid: number,
    to_uid: number,
    tid: number,
    isPush: boolean
  ): Promise<void> {
    // 不允许用户自己给自己点踩
    if (uid === to_uid) {
      return
    }

    // 点踩数，取消则 -1， 否则为 1
    const amount = isPush ? 1 : -1
    // 热度
    const popularity = isPush ? -5 : 5

    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // 将用户的 uid 作用于话题的 likes 数组中
      // 更新话题的热度
      // 更新话题的热度和点踩计数
      await TopicModel.updateOne(
        { tid: tid },
        {
          $inc: { popularity: popularity, dislikes_count: amount },
          [isPush ? '$addToSet' : '$pull']: { dislikes: uid },
        }
      )

      // 将话题的 tid 作用于用户的 dislike_topic 数组中
      await UserModel.updateOne(
        { uid: uid },
        { [isPush ? '$addToSet' : '$pull']: { dislike_topic: tid } }
      )

      // 更新被点踩用户的被点踩数
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

  /*
   * 主页
   */

  // 首页左边获取热度最高的 10 条话题数据
  async getNavTopTopics(limit: number) {
    const topics = await TopicModel.find({}, 'tid title popularity')
      .sort({ popularity: -1 })
      .limit(limit)
      .lean()

    const data = topics.map((topic) => ({
      tid: topic.tid,
      title: topic.title,
      popularity: topic.popularity,
    }))

    return data
  }

  // 首页左边获取最新发布的 10 条话题数据
  async getNavNewTopics(limit: number) {
    const topics = await TopicModel.find({}, 'tid title time')
      .sort({ time: -1 })
      .limit(limit)
      .lean()

    const data = topics.map((topic) => ({
      tid: topic.tid,
      title: topic.title,
      time: topic.time,
    }))

    return data
  }

  // 获取首页话题
  /**
   * @param {Array} category - 话题的分类，目前有三种，Galgame, Technique, Others
   * @param {Number} page - 分页页数
   * @param {Number} limit - 每页的数据数
   * @param {SortField} sortField - 按照哪个字段排序
   * @param {SortOrder} sortOrder - 排序的顺序，有 `asc`, `desc`
   */
  async getHomeTopics(
    category: string[],
    page: number,
    limit: number,
    sortField: SortField,
    sortOrder: SortOrder
  ) {
    const skip = (page - 1) * limit

    const searchQuery = {
      category: { $in: category },
    }

    const sortOptions: Record<string, 'asc' | 'desc'> = {
      [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
    }

    const topics = await TopicModel.find(searchQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate('user', 'uid avatar name')
      .lean()

    const data = topics.map((topic) => ({
      tid: topic.tid,
      title: topic.title,
      views: topic.views,
      upvotesCount: topic.upvotes_count,
      likesCount: topic.likes_count,
      repliesCount: topic.replies_count,
      comments: topic.comments,
      time: topic.time,
      // Preview length
      content: topic.content.slice(0, 233),
      tags: topic.tags,
      category: topic.category,
      popularity: topic.popularity,
      user: {
        uid: topic.user[0].uid,
        avatar: topic.user[0].avatar,
        name: topic.user[0].name,
      },
      status: topic.status,
      upvote_time: topic.upvote_time,
    }))

    return data
  }

  // 获取话题池话题
  /**
   * @param {Number} page - 分页页数
   * @param {Number} limit - 每页的数据数
   * @param {SortFieldPool} sortField - 按照哪个字段排序
   * @param {SortOrder} sortOrder - 排序的顺序，有 `asc`, `desc`
   */
  async getPoolTopics(
    page: number,
    limit: number,
    sortField: SortFieldPool,
    sortOrder: SortOrder
  ) {
    const skip = (page - 1) * limit

    const sortOptions: Record<string, 'asc' | 'desc'> = {
      [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
    }

    const topics = await TopicModel.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()

    const data = topics.map((topic) => ({
      tid: topic.tid,
      title: topic.title,
      views: topic.views,
      likesCount: topic.likes_count,
      time: topic.time,
      // Preview length
      content: topic.content.slice(0, 233),
    }))

    return data
  }

  // 获取技术交流话题
  /**
   * @param {Number} page - 分页页数
   * @param {Number} limit - 每页的数据数
   * @param {SortField} sortField - 按照哪个字段排序
   * @param {SortOrder} sortOrder - 排序的顺序，有 `asc`, `desc`
   */
  async getTechniqueTopics(
    page: number,
    limit: number,
    sortField: SortField,
    sortOrder: SortOrder
  ) {
    const skip = (page - 1) * limit

    const sortOptions: Record<string, 'asc' | 'desc'> = {
      [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
    }

    const topics = await TopicModel.find({ category: 'Technique' })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()

    const data = topics.map((topic) => ({
      tid: topic.tid,
      title: topic.title,
      views: topic.views,
      likesCount: topic.likes_count,
      replyCount: topic.replies_count,
      // Preview length
      content: topic.content.slice(0, 233),
      tags: topic.tags,
    }))

    return data
  }

  // 检索话题，用于搜索框
  /**
   * @param {String} keywords - 搜索关键词，不填默认全部
   * @param {Array} category - 话题的分类，目前有三种，Galgame, Technique, Others
   * @param {Number} page - 分页页数
   * @param {Number} limit - 每页的数据数
   * @param {SortField} sortField - 按照哪个字段排序
   * @param {SortOrder} sortOrder - 排序的顺序，有 `asc`, `desc`
   */
  async searchTopics(
    keywords: string,
    category: string[],
    page: number,
    limit: number,
    sortField: SortField,
    sortOrder: SortOrder
  ) {
    const skip = (page - 1) * limit

    // 将传过来的搜索内容按照空格分开搜索
    const keywordsArray: string[] = keywords
      .split(' ')
      .filter((keyword) => keyword.trim() !== '')

    // 对特殊字符进行转义
    const escapedKeywords = keywordsArray.map((keyword) =>
      keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    )

    // 构建 OR 条件来检索多个字段
    // 使用 $in 条件将每个关键词分别应用于不同的字段进行匹配
    // 提供 keywords 时的查询
    const searchQuery = {
      $and: [
        { category: { $in: category } },
        {
          $or: [
            { title: { $regex: escapedKeywords.join('|'), $options: 'i' } },
            { content: { $regex: escapedKeywords.join('|'), $options: 'i' } },
            { category: { $in: escapedKeywords } },
            { tags: { $in: escapedKeywords } },
          ],
        },
      ],
    }

    const sortOptions: Record<string, 'asc' | 'desc'> = {
      [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
    }

    const topics = await TopicModel.find(searchQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()

    const data = topics.map((topic) => ({
      tid: topic.tid,
      title: topic.title,
      category: topic.category,
      // Preview length
      content: topic.content.slice(0, 107),
    }))

    return data
  }

  /**
   * 获取热门话题，用于 ranking
   */

  /**
   * @param {Number} page - 分页页数
   * @param {Number} limit - 每页的数据数
   * @param {SortFieldRanking} sortField - 按照哪个字段排序
   * @param {SortOrder} sortOrder - 排序的顺序，有 `asc`, `desc`
   */
  // 获取排行榜 50 条话题数据，根据 sortField, sortOrder
  async getTopicRanking(
    page: number,
    limit: number,
    sortField: SortFieldRanking,
    sortOrder: SortOrder
  ) {
    const skip = (page - 1) * limit

    const sortOptions: Record<string, 'asc' | 'desc'> = {
      [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
    }

    const topics = await TopicModel.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()

    const responseData = topics.map((topic) => ({
      tid: topic.tid,
      title: topic.title,
      field: topic[sortField],
    }))

    return responseData
  }
}

export default new TopicService()
