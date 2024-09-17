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
    popularity: topic.popularity,
    user: {
      uid: topic.user[0].uid,
      name: topic.user[0].name
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
          {
            'introduction.en-us': { $regex: keywords.join('|'), $options: 'i' }
          },
          {
            'introduction.ja-jp': { $regex: keywords.join('|'), $options: 'i' }
          },
          {
            'introduction.zh-cn': { $regex: keywords.join('|'), $options: 'i' }
          },
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
    .lean()

  const galgames: SearchResultGalgame[] = await Promise.all(
    data.map(async (galgame) => {
      const contributors = await Promise.all(
        galgame.contributor.map(async (uid: number) => {
          const user = await UserModel.findOne({ uid }).lean()
          return {
            uid,
            name: user?.name || '',
            avatar: user?.avatar || ''
          }
        })
      )

      return {
        gid: galgame.gid,
        name: galgame.name,
        time: galgame.time,
        views: galgame.views,
        contributors,
        languages: galgame.language,
        platforms: galgame.platform
      }
    })
  )

  return galgames
}

export const searchUser = async (name: string, skip: number, limit: number) => {
  const regex = new RegExp(name, 'i')
  const users = await UserModel.find({ name: regex })
    .skip(skip)
    .limit(limit)
    .lean()

  const responseData: SearchResultUser[] = users.map((user) => ({
    uid: user.uid,
    name: user.name,
    avatar: user.avatar,
    bio: user.bio,
    time: user.time
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
    .skip(skip)
    .limit(limit)
    .populate('topic', 'title', UserModel)
    .populate('r_user', 'uid avatar name', UserModel)
    .lean()

  const responseData: SearchResultReply[] = replies.map((reply) => ({
    tid: reply.tid,
    title: reply.topic[0].title,
    content: reply.content,
    user: {
      uid: reply.r_user[0].uid,
      name: reply.r_user[0].name,
      avatar: reply.r_user[0].avatar
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
    .skip(skip)
    .limit(limit)
    .populate('cuid', 'uid avatar name', UserModel)
    .lean()

  const responseData: SearchResultComment[] = comments.map((comment) => ({
    tid: comment.tid,
    title: comment.topic[0].title,
    content: comment.content,
    user: {
      uid: comment.cuid[0].uid,
      avatar: comment.cuid[0].avatar,
      name: comment.cuid[0].name
    },
    time: new Date(comment.created).getTime()
  }))

  return responseData
}
