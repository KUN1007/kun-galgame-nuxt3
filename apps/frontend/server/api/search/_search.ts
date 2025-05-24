import TopicModel from '~/server/models/topic'
import GalgameModel from '~/server/models/galgame'
import UserModel from '~/server/models/user'
import ReplyModel from '~/server/models/reply'
import CommentModel from '~/server/models/comment'
import type {
  SearchResultTopic,
  SearchResultGalgame,
  SearchResultUser,
  SearchResultReply,
  SearchResultComment
} from '~/types/api/search'

export const searchTopic = async (
  keywords: string[],
  skip: number,
  limit: number
) => {
  const searchQuery = {
    $and: [
      { status: { $ne: 1 } },
      {
        $or: [
          { title: { $regex: keywords.join('|'), $options: 'i' } },
          { content: { $regex: keywords.join('|'), $options: 'i' } },
          { category: { $in: keywords } },
          { tags: { $in: keywords } }
        ]
      }
    ]
  }

  const data = await TopicModel.find(searchQuery)
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const topics: SearchResultTopic[] = data.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    views: topic.views,
    likes: topic.likes.length,
    replies: topic.replies.length,
    comments: topic.comments,
    time: topic.time,
    tags: topic.tags,
    section: topic.section,
    user: {
      uid: topic.user[0].uid,
      name: topic.user[0].name,
      avatar: topic.user[0].avatar
    },
    status: topic.status,
    upvoteTime: topic.upvote_time
  }))

  return topics
}

export const searchGalgame = async (
  keywords: string[],
  skip: number,
  limit: number
) => {
  const searchQuery = {
    $and: [
      { status: { $ne: 1 } },
      {
        $or: [
          { 'name.en-us': { $regex: keywords.join('|'), $options: 'i' } },
          { 'name.ja-jp': { $regex: keywords.join('|'), $options: 'i' } },
          { 'name.zh-cn': { $regex: keywords.join('|'), $options: 'i' } },
          { 'name.zh-tw': { $regex: keywords.join('|'), $options: 'i' } },
          // {
          //   'introduction.en-us': { $regex: keywords.join('|'), $options: 'i' }
          // },
          // {
          //   'introduction.ja-jp': { $regex: keywords.join('|'), $options: 'i' }
          // },
          // {
          //   'introduction.zh-cn': { $regex: keywords.join('|'), $options: 'i' }
          // },
          // {
          //   'introduction.zh-tw': { $regex: keywords.join('|'), $options: 'i' }
          // },
          { alias: { $in: keywords } },
          { tags: { $in: keywords } },
          { vndb_id: { $in: keywords } }
        ]
      }
    ]
  }

  const data = await GalgameModel.find(searchQuery)
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const galgames: SearchResultGalgame[] = data.map((galgame) => ({
    gid: galgame.gid,
    name: galgame.name,
    banner: galgame.banner,
    user: {
      uid: galgame.user[0].uid,
      name: galgame.user[0].name,
      avatar: galgame.user[0].avatar
    },
    contentLimit: galgame.content_limit,
    views: galgame.views,
    likes: galgame.likes.length,
    favorites: galgame.favorites.length,
    time: galgame.time,
    platform: galgame.platform,
    language: galgame.language
  }))

  return galgames
}

export const searchUser = async (name: string, skip: number, limit: number) => {
  const regex = new RegExp(name, 'i')
  const users = await UserModel.find({ name: regex })
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  const responseData: SearchResultUser[] = users.map((user) => ({
    uid: user.uid,
    name: user.name,
    avatar: user.avatar,
    bio: user.bio,
    time: user.time,
    moemoepoint: user.moemoepoint
  }))

  return responseData
}

export const searchReply = async (
  content: string,
  skip: number,
  limit: number
) => {
  const regex = new RegExp(content, 'i')
  const replies = await ReplyModel.find({ content: regex })
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .populate('topic', 'title', TopicModel)
    .populate('r_user', 'uid avatar name', UserModel)
    .populate('to_user', 'uid avatar name', UserModel)
    .lean()

  const responseData: SearchResultReply[] = replies.map((reply) => ({
    tid: reply.tid,
    title: reply.topic[0].title,
    content: reply.content.slice(0, 233),
    user: {
      uid: reply.r_user[0].uid,
      name: reply.r_user[0].name,
      avatar: reply.r_user[0].avatar
    },
    toUser: {
      uid: reply.to_user[0].uid,
      name: reply.to_user[0].name,
      avatar: reply.to_user[0].avatar
    },
    time: reply.time
  }))

  return responseData
}

export const searchComment = async (
  content: string,
  skip: number,
  limit: number
) => {
  const regex = new RegExp(content, 'i')
  const comments = await CommentModel.find({ content: regex })
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .populate('topic', 'title', TopicModel)
    .populate('cuid', 'uid avatar name', UserModel)
    .populate('touid', 'uid avatar name', UserModel)
    .lean()

  const responseData: SearchResultComment[] = comments.map((comment) => ({
    tid: comment.tid,
    title: comment.topic[0].title,
    content: comment.content.slice(0, 233),
    user: {
      uid: comment.cuid[0].uid,
      avatar: comment.cuid[0].avatar,
      name: comment.cuid[0].name
    },
    toUser: {
      uid: comment.touid[0].uid,
      avatar: comment.touid[0].avatar,
      name: comment.touid[0].name
    },
    time: new Date(comment.created).getTime()
  }))

  return responseData
}
