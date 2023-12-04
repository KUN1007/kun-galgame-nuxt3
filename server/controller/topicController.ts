import { Context } from 'koa'
import TopicService from '@/service/topicService'
// 操作 cookie 的函数
import { getCookieTokenInfo } from '@/utils/cookies'

import { checkTopicPublish } from './utils/checkTopicPublish'
import { isValidTimestamp } from '@/utils/validate'

import type {
  SortField,
  SortFieldRanking,
  SortFieldPool,
  SortOrder,
} from './types/topicController'

class TopicController {
  /*
   * 话题页面
   */

  // 根据话题 id 获取单条话题数据
  async getTopicByTid(ctx: Context) {
    const tid = parseInt(ctx.params.tid as string)
    const topic = await TopicService.getTopicByTid(tid)

    if (!topic) {
      ctx.body = { code: '404', message: 'Topic not found', data: {} }
      return
    }

    ctx.body = {
      code: 200,
      message: 'OK',
      data: topic,
    }
  }

  // 推话题
  async updateTopicUpvote(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid

    const tid = parseInt(ctx.params.tid as string)
    const to_uid = parseInt(ctx.query.to_uid as string)
    const time = parseInt(ctx.query.time as string)

    if (!isValidTimestamp(time)) {
      ctx.app.emit('kunError', 10208, ctx)
      return
    }

    const result = await TopicService.updateTopicUpvote(uid, to_uid, tid, time)

    // 返回错误码，您的萌萌点不足 1100，无法使用推话题功能
    if (result === 10202) {
      ctx.app.emit('kunError', result, ctx)
      return
    }

    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  // 点赞话题
  async updateTopicLike(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid

    const tid = parseInt(ctx.params.tid as string)

    const to_uid = parseInt(ctx.query.to_uid as string)
    const isPush = ctx.query.isPush === 'true'
    await TopicService.updateTopicLike(uid, to_uid, tid, isPush)

    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  // 点踩话题
  async updateTopicDislike(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid

    const tid = parseInt(ctx.params.tid as string)

    const to_uid = parseInt(ctx.query.to_uid as string)
    const isPush = ctx.query.isPush === 'true'
    await TopicService.updateTopicDislike(uid, to_uid, tid, isPush)

    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  // 楼主的其它话题，按热度
  async getPopularTopicsByUserUid(ctx: Context) {
    const uid = parseInt(ctx.query.uid as string)
    const tid = parseInt(ctx.params.tid as string)

    const popularTopics = await TopicService.getPopularTopicsByUserUid(uid, tid)

    ctx.body = {
      code: 200,
      message: 'OK',
      data: popularTopics,
    }
  }

  // 相同标签下的其它话题，按热度
  async getRelatedTopicsByTags(ctx: Context) {
    const tid = parseInt(ctx.params.tid as string)
    // 传 tid 的目的是过滤掉当前话题
    const { tags } = ctx.query

    const tagsArray = tags.toString().split(',')
    const relatedTopics = await TopicService.getRelatedTopicsByTags(
      tagsArray,
      tid
    )

    ctx.body = {
      code: 200,
      message: 'OK',
      data: relatedTopics,
    }
  }

  /*
   * 编辑界面
   */

  // 创建话题
  async createTopic(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid
    const { title, content, time, tags, category } = ctx.request.body

    const res = checkTopicPublish(title, content, tags, category, time)

    if (res) {
      ctx.app.emit('kunError', res, ctx)
      return
    }

    const result = await TopicService.createTopic(
      title,
      content,
      time,
      tags,
      category,
      uid
    )

    // 返回错误码，您今日发布的话题数已达上限
    if (result === 10201) {
      ctx.app.emit('kunError', result, ctx)
      return
    }

    ctx.body = { code: 200, message: 'OK', data: { tid: result } }
  }

  // 更新话题（标题，内容，标签，分类）
  async updateTopic(ctx: Context) {
    // 从 cookie 获取用户信息
    const uid = getCookieTokenInfo(ctx).uid

    const tid = parseInt(ctx.params.tid as string)

    const { title, content, tags, category, edited } = ctx.request.body

    const res = checkTopicPublish(title, content, tags, category, edited)

    if (res) {
      ctx.app.emit('kunError', res, ctx)
      return
    }

    await TopicService.updateTopic(
      uid,
      tid,
      title,
      content,
      tags,
      category,
      edited
    )

    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  /*
   * 主页
   */

  // 首页左边获取热度最高的 10 条话题数据
  async getNavTopTopics(ctx: Context) {
    const limit = 10 // 设置返回的话题数量
    const data = await TopicService.getNavTopTopics(limit)

    ctx.body = {
      code: 200,
      message: 'OK',
      data: data,
    }
  }

  // 首页左边获取最新发布的 10 条话题数据
  async getNavNewTopics(ctx: Context) {
    const limit = 10 // 设置返回的话题数量
    const data = await TopicService.getNavNewTopics(limit)

    ctx.body = {
      code: 200,
      message: 'OK',
      data: data,
    }
  }

  // 获取首页话题
  async getHomeTopics(ctx: Context) {
    const { category, page, limit, sortField, sortOrder } = ctx.query
    const data = await TopicService.getHomeTopics(
      JSON.parse(category as string),
      parseInt(page as string),
      parseInt(limit as string),
      sortField as SortField,
      sortOrder as SortOrder
    )
    ctx.body = { code: 200, message: 'OK', data: data }
  }

  // 获取话题池话题
  async getPoolTopics(ctx: Context) {
    const { page, limit, sortField, sortOrder } = ctx.query
    const data = await TopicService.getPoolTopics(
      parseInt(page as string),
      parseInt(limit as string),
      sortField as SortFieldPool,
      sortOrder as SortOrder
    )
    ctx.body = { code: 200, message: 'OK', data: data }
  }

  // 获取技术交流话题
  async getTechniqueTopics(ctx: Context) {
    const { page, limit, sortField, sortOrder } = ctx.query
    const data = await TopicService.getTechniqueTopics(
      parseInt(page as string),
      parseInt(limit as string),
      sortField as SortField,
      sortOrder as SortOrder
    )
    ctx.body = { code: 200, message: 'OK', data: data }
  }

  // 按关键词搜索话题
  async searchTopics(ctx: Context) {
    const { keywords, category, page, limit, sortField, sortOrder } = ctx.query
    const data = await TopicService.searchTopics(
      (keywords as string).trim().slice(0, 40),
      JSON.parse(category as string),
      parseInt(page as string),
      parseInt(limit as string),
      sortField as SortField,
      sortOrder as SortOrder
    )
    ctx.body = { code: 200, message: 'OK', data: data }
  }

  // 获取热门话题，用于 ranking
  async getTopicRanking(ctx: Context) {
    const { page, limit, sortField, sortOrder } = ctx.query

    const topics = await TopicService.getTopicRanking(
      parseInt(page as string),
      parseInt(limit as string),
      sortField as SortFieldRanking,
      sortOrder as SortOrder
    )
    ctx.body = { code: 200, message: 'OK', data: topics }
  }
}

export default new TopicController()
