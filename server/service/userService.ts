/*
 * 用户的 CRUD，定义了一些对用户数据的数据库交互操作
 */

import bcrypt from 'bcrypt'
import UserModel from '@/models/userModel'
import TopicModel from '@/models/topicModel'
// 导入发送验证码和验证的 Service
import AuthService from './authService'
import mongoose from '@/db/connection'
import type { LoginResponseData } from './types/userService'
import ReplyModel from '@/models/replyModel'
import CommentModel from '@/models/commentModel'

import type { SortOrder, SortFieldRanking } from './types/userService'

class UserService {
  // 获取单个用户全部信息
  async getUserByUid(uid: number) {
    const user = await UserModel.findOne({ uid })
    const responseData = {
      uid: user.uid,
      name: user.name,
      avatar: user.avatar,
      roles: user.roles,
      status: user.status,
      time: user.time,
      moemoepoint: user.moemoepoint,
      bio: user.bio,
      upvote: user.upvote,
      like: user.like,
      dislike: user.dislike,
      daily_topic_count: user.daily_topic_count,

      topic: user.topic,
      reply: user.reply,
      comment: user.comment,
      likeTopic: user.like_topic,
      upvoteTopic: user.upvote_topic,
    }
    return responseData
  }

  // 获取用户的部分信息
  /**
   * @param {number} uid - 用户名
   * @param {string[]} fieldsToSelect - 要选择的字段
   */
  async getUserInfoByUid(uid: number, fieldsToSelect: string[]) {
    const userProjection = fieldsToSelect.join(' ')
    const user = await UserModel.findOne({ uid }).select(userProjection)
    return user
  }

  /*
   * 接受用户传过来的数据并返回 token
   */

  async loginUser(
    name: string,
    password: string
  ): Promise<number | LoginResponseData> {
    // 通过 mongodb 的 $or 运算符检查用户名或邮箱
    const user = await UserModel.findOne({ $or: [{ name }, { email: name }] })

    // 用户不存在
    if (!user) {
      return 10101
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    // 密码错误
    if (isCorrectPassword) {
      // 生成 token，需要用户的 uid 和 name
      const { token, refreshToken } = await AuthService.generateTokens(
        user.uid,
        user.name
      )

      // 返回 access token 和必要信息，refreshToken 用于 http only token
      const userInfo = {
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
        moemoepoint: user.moemoepoint,
        roles: user.roles,
        token,
      }

      return {
        data: userInfo,
        refreshToken,
      }
    } else {
      // 密码错误
      return 10102
    }
  }

  // 注册逻辑
  async registerUser(
    name: string,
    email: string,
    password: string,
    code: string,
    ip?: string
  ): Promise<number | LoginResponseData> {
    // 验证邮箱验证码是否正确且有效
    const isCodeValid = await AuthService.verifyVerificationCode(email, code)
    if (!isCodeValid) {
      // 邮箱验证码错误
      return 10103
    }

    // 邮箱已被注册，使用 UserModel.countDocuments 会比 UserModel.findOne 效率更好
    const emailCount = await UserModel.countDocuments({ email })
    if (emailCount > 0) {
      // 邮箱已被注册错误
      return 10104
    }

    /*
     * 正则表达式
     * 这里的逻辑是在对单个 mongodb 的数据字段查找时，添加了 i 标志来实现不区分大小写的查询
     * 这样可以保证把 mongodb 中存储的数据不区分大小写和 body.name 进行比较
     * 预期实现的效果是：
     * 已注册 `kun` 则 `KUN` 会显示已占用
     * 但是如果注册时注册为 `KUN` 则数据库中也保存的是 `KUN` 而不是 `kun`
     */
    const usernameCount = await UserModel.countDocuments({
      name: { $regex: new RegExp('^' + name + '$', 'i') },
    })
    if (usernameCount > 0) {
      // 用户名已被注册错误
      return 10105
    }

    // 启动事务
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // 写入数据到数据库
      // bcrypt.hash 的第二个参数为哈希函数的迭代次数，越大加密效果越好但运算越慢
      const hashedPassword = await bcrypt.hash(password, 7)

      // 新建一个 User 数据
      const user = new UserModel({
        name,
        email,
        password: hashedPassword,
        ip,
      })

      // 新建用户后自动登陆
      await user.save()

      // 登陆接口拿到的 token 等数据，这里的 password 是用户传过来的 password
      const loginData = await this.loginUser(name, password)

      // 提交事务
      await session.commitTransaction()
      session.endSession()

      // 返回数据
      return loginData
    } catch (error) {
      // 如果出现错误，回滚事务
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }

  // 更新用户的头像
  async updateUserAvatar(uid: number, image: string) {
    await UserModel.updateOne({ uid }, { $set: { avatar: image } })
  }

  // 更新用户的签名
  async updateUserBio(uid: number, bio: string) {
    await UserModel.updateOne({ uid }, { $set: { bio: bio } })
  }

  // 获取用户邮箱
  async getUserEmail(uid: number) {
    const user = await UserModel.findOne({ uid })
    const email = user.email
    const atIndex = email.indexOf('@')
    // 获取邮箱地址的局部部分和域部分
    const localPart = email.slice(0, atIndex)
    const domain = email.slice(atIndex)

    // 保留局部部分的前三个字符，其他字符替换为 ~
    const maskedLocalPart =
      localPart.slice(0, 3) + '~'.repeat(localPart.length - 3)

    // 拼接局部部分和域部分，并返回
    return maskedLocalPart + domain
  }

  /**
   * 更改用户邮箱
   * @param {number} uid - 用户的 uid
   * @param {string} email - 用户的新邮箱
   * @param {string} code - 用户验证码
   */
  async updateUserEmail(uid: number, email: string, code: string) {
    // 验证邮箱验证码是否正确且有效
    const isCodeValid = await AuthService.verifyVerificationCode(email, code)
    if (!isCodeValid) {
      // 邮箱验证码错误
      return 10103
    }
    const user = await UserModel.findOneAndUpdate(
      { uid: uid },
      { $set: { email: email } }
    )
    // 用户不存在
    if (!user) {
      return 10101
    }
  }

  /**
   * 更改用户密码,这里是根据用户密码更改的,不是根据邮箱
   * @param {number} uid - 用户 uid
   * @param {string} oldPassword - 用户的旧密码
   * @param {string} newPassword - 用户的新密码
   */
  async updateUserPassword(
    uid: number,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await UserModel.findOne({ uid })

    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password)

    if (!isCorrectPassword) {
      // 密码错误
      return 10102
    }

    // bcrypt.hash 的第二个参数为哈希函数的迭代次数，越大加密效果越好但运算越慢
    const hashedPassword = await bcrypt.hash(newPassword, 7)
    // 存储加密后的密码
    await UserModel.updateOne({ uid }, { $set: { password: hashedPassword } })
  }

  // 获取用户话题，发布的，点赞的，推的
  async getUserTopics(tidArray: number[]) {
    // 仅显示前 50 个
    const topics = await TopicModel.find({ tid: { $in: tidArray } }).limit(50)

    const responseData = topics.map((topic) => ({
      tid: topic.tid,
      title: topic.title,
      time: topic.time,
    }))
    return responseData
  }

  // 获取用户回复
  async getUserReplies(ridArray: number[]) {
    // 仅显示前 50 个
    const replies = await ReplyModel.find({ rid: { $in: ridArray } }).limit(50)

    // 这里用了字符串切片，取前 100 个字符
    const responseData = replies.map((reply) => ({
      tid: reply.tid,
      content: reply.content.substring(0, 100),
      time: reply.time,
    }))
    return responseData
  }

  // 获取用户评论
  async getUserComments(cidArray: number[]) {
    // 仅显示前 50 个
    const comments = await CommentModel.find({ cid: { $in: cidArray } }).limit(
      50
    )

    // 这里用了字符串切片，取前 100 个字符
    const responseData = comments.map((comment) => ({
      tid: comment.tid,
      content: comment.content.substring(0, 100),
    }))
    return responseData
  }

  /**
   * 排行榜页获取用户排行
   */
  /**
   * @param {Number} page - 分页页数
   * @param {Number} limit - 每页的数据数
   * @param {SortFieldRanking} sortField - 按照哪个字段排序
   * @param {SortOrder} sortOrder - 排序的顺序，有 `asc`, `desc`
   */
  // 获取排行榜 30 条用户数据，根据 sortField, sortOrder
  async getUserRanking(
    page: number,
    limit: number,
    sortField: SortFieldRanking,
    sortOrder: SortOrder
  ) {
    const skip = (page - 1) * limit

    const sortOptions: Record<string, 'asc' | 'desc'> = {
      [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
    }

    const users = await UserModel.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()

    const responseData = users.map((user) => ({
      uid: user.uid,
      name: user.name,
      avatar: user.avatar,
      field: user[sortField],
    }))

    return responseData
  }
}

export default new UserService()
