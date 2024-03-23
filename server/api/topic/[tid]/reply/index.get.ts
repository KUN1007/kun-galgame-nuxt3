import TopicModel from '~/server/models/topic'
import ReplyModel from '~/server/models/reply'
import mongoose from 'mongoose'
import type {
  TopicReplyRequestData,
  TopicReply,
  SortField,
  SortOrder
} from '~/types/api/reply'

const getReplies = async (
  tid: number,
  page: number,
  limit: number,
  sortField: SortField,
  sortOrder: SortOrder
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
    const sortOptions: Record<string, 'asc' | 'desc'> = {
      [sortField]: sortOrder === 'asc' ? 'asc' : 'desc'
    }

    const replyDetails = await ReplyModel.find({ rid: { $in: replyId } })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate('r_user', 'uid avatar name moemoepoint')
      .populate('to_user', 'uid name')
      .lean()

    const responseData: TopicReply[] = replyDetails.map((reply) => ({
      rid: reply.rid,
      tid: reply.tid,
      floor: reply.floor,
      to_floor: reply.to_floor,
      r_user: {
        uid: reply.r_user[0].uid,
        name: reply.r_user[0].name,
        avatar: reply.r_user[0].avatar,
        moemoepoint: reply.r_user[0].moemoepoint
      },
      to_user: {
        uid: reply.to_user[0].uid,
        name: reply.to_user[0].name
      },
      edited: reply.edited,
      content: reply.content,
      upvotes: reply.upvotes,
      upvote_time: reply.upvote_time,
      likes: reply.likes,
      dislikes: reply.dislikes,
      tags: reply.tags,
      time: reply.time,
      comment: reply.comment
    }))

    await session.commitTransaction()

    return responseData
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    kunError(event, 10210)
    return
  }

  const { page, limit, sortField, sortOrder }: TopicReplyRequestData =
    await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder) {
    kunError(event, 10507)
    return
  }

  if (limit !== '3') {
    kunError(event, 10209)
    return
  }

  const result = await getReplies(
    parseInt(tid),
    parseInt(page),
    parseInt(limit),
    sortField,
    sortOrder
  )
  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return result
})
