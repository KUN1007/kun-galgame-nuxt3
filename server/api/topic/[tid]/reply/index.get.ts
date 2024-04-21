import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import ReplyModel from '~/server/models/reply'
import CommentModel from '~/server/models/comment'
import mongoose from 'mongoose'
import type { TopicReplyRequestData, TopicReply } from '~/types/api/topic-reply'
import type { TopicComment } from '~/types/api/topic-comment'

const getComments = async (uid: number, rid: number) => {
  const comment = await CommentModel.find({ rid })
    .populate('cuid', 'uid avatar name', UserModel)
    .populate('touid', 'uid name', UserModel)
    .lean()

  const replyComments: TopicComment[] = comment.map((comment) => ({
    cid: comment.cid,
    rid: comment.rid,
    tid: comment.tid,
    user: {
      uid: comment.cuid[0].uid,
      avatar: comment.cuid[0].avatar,
      name: comment.cuid[0].name
    },
    toUser: {
      uid: comment.touid[0].uid,
      name: comment.touid[0].name
    },
    content: comment.content,
    likes: {
      count: comment.likes.length,
      isLiked: comment.likes.includes(uid)
    }
  }))

  return replyComments
}

const getReplies = async (
  uid: number,
  tid: number,
  page: number,
  limit: number,
  sortOrder: KunOrder
) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const reply = await TopicModel.findOne({ tid }).lean()
    if (!reply) {
      return 10506
    }
    const replyId = reply.replies

    const skip = (page - 1) * limit

    const totalCount = await ReplyModel.countDocuments({
      rid: { $in: replyId }
    }).lean()
    const replyDetails = await ReplyModel.find({ rid: { $in: replyId } })
      .sort({ floor: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('r_user', 'uid avatar name moemoepoint', UserModel)
      .populate('to_user', 'uid name', UserModel)
      .lean()

    const repliesData: TopicReply[] = await Promise.all(
      replyDetails.map(async (reply) => ({
        rid: reply.rid,
        tid: reply.tid,
        floor: reply.floor,
        toFloor: reply.to_floor,
        user: {
          uid: reply.r_user[0].uid,
          name: reply.r_user[0].name,
          avatar: reply.r_user[0].avatar,
          moemoepoint: reply.r_user[0].moemoepoint
        },
        toUser: {
          uid: reply.to_user[0].uid,
          name: reply.to_user[0].name
        },
        edited: reply.edited,
        content: reply.content,
        upvotes: {
          count: reply.upvotes.length,
          isUpvoted: reply.upvotes.includes(uid)
        },
        upvoteTime: reply.upvote_time,
        likes: {
          count: reply.likes.length,
          isLiked: reply.likes.includes(uid)
        },
        dislikes: {
          count: reply.dislikes.length,
          isDisliked: reply.dislikes.includes(uid)
        },
        tags: reply.tags,
        time: reply.time,
        comment: await getComments(uid, reply.rid)
      }))
    )

    await session.commitTransaction()

    return { repliesData, totalCount }
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    return kunError(event, 10210)
  }

  const { page, limit, sortOrder }: TopicReplyRequestData =
    await getQuery(event)
  if (!page || !limit || !sortOrder) {
    return kunError(event, 10507)
  }

  if (limit !== '17') {
    return kunError(event, 10209)
  }

  const userInfo = await getCookieTokenInfo(event)
  const result = await getReplies(
    userInfo?.uid ?? 0,
    parseInt(tid),
    parseInt(page),
    parseInt(limit),
    sortOrder
  )
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return result
})
