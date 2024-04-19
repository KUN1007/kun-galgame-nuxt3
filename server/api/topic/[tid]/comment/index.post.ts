import mongoose from 'mongoose'
import TopicModel from '~/server/models/topic'
import ReplyModel from '~/server/models/reply'
import CommentModel from '~/server/models/comment'
import UserModel from '~/server/models/user'
import { checkCommentPublish } from '../../utils/checkCommentPublish'
import type { H3Event } from 'h3'
import type {
  TopicComment,
  TopicCreateCommentRequestData
} from '~/types/api/topic-comment'

const readReplyData = async (event: H3Event) => {
  const { rid, toUid, content }: TopicCreateCommentRequestData =
    await readBody(event)
  if (!rid || !toUid) {
    return kunError(event, 10507)
  }

  const res = checkCommentPublish(content)
  if (res) {
    return kunError(event, res)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    return kunError(event, 10210)
  }

  return {
    rid,
    tid: parseInt(tid),
    c_uid: userInfo.uid,
    to_uid: toUid,
    content
  }
}

export default defineEventHandler(async (event) => {
  const result = await readReplyData(event)
  if (!result) {
    return
  }
  const { rid, tid, c_uid, to_uid, content } = result

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const newComment = new CommentModel({
      rid,
      tid,
      c_uid,
      to_uid,
      content
    })

    const savedComment = await newComment.save()

    const commentUser = await UserModel.findOneAndUpdate(
      {
        uid: c_uid
      },
      { $addToSet: { comment: savedComment.cid } }
    )
    if (!commentUser) {
      return kunError(event, 10101)
    }

    const toUser = await UserModel.findOneAndUpdate(
      {
        uid: to_uid
      },
      { $inc: { moemoepoint: 1 } }
    )
    if (!toUser) {
      return kunError(event, 10101)
    }

    await TopicModel.updateOne(
      { tid },
      { $inc: { popularity: 2, comments: 1 } }
    ).lean()

    await ReplyModel.findOneAndUpdate(
      { rid },
      { $addToSet: { comment: savedComment.cid } }
    ).lean()

    if (c_uid !== to_uid) {
      await createMessage(c_uid, to_uid, 'commented', savedComment.content, tid)
    }

    const responseData: TopicComment = {
      cid: savedComment.cid,
      rid: savedComment.rid,
      tid: savedComment.tid,
      user: {
        uid: commentUser.uid,
        name: commentUser.name,
        avatar: commentUser.avatar
      },
      toUser: {
        uid: toUser.uid,
        name: toUser.name
      },
      content: savedComment.content,
      likes: {
        count: savedComment.likes.length,
        isLiked: savedComment.likes.includes(c_uid)
      }
    }

    await session.commitTransaction()

    return responseData
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
