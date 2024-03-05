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
} from '~/types/api/comment'

const readReplyData = async (event: H3Event) => {
  const { rid, to_uid, content }: TopicCreateCommentRequestData =
    await readBody(event)
  if (!rid || !to_uid) {
    kunError(event, 10507)
    return
  }

  const res = checkCommentPublish(content)
  if (res) {
    kunError(event, res)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    kunError(event, 10210)
    return
  }

  return {
    rid: parseInt(rid),
    tid: parseInt(tid),
    c_uid: uid,
    to_uid: parseInt(to_uid),
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
      { $addToSet: { comment: savedComment.cid }, $inc: { comment_count: 1 } }
    )
    if (!commentUser) {
      kunError(event, 10101)
      return
    }

    const toUser = await UserModel.findOneAndUpdate(
      {
        uid: to_uid
      },
      { $inc: { moemoepoint: 1 } }
    )
    if (!toUser) {
      kunError(event, 10101)
      return
    }

    await TopicModel.updateOne(
      { tid },
      { $inc: { popularity: 2, comments: 1 } }
    ).lean()

    await ReplyModel.findOneAndUpdate(
      { rid },
      { $addToSet: { comment: savedComment.cid } },
      { $inc: { comment_count: 1 } }
    ).lean()

    if (c_uid !== to_uid) {
      await createMessage(c_uid, to_uid, 'commented', savedComment.content, tid)
    }

    const responseData: TopicComment = {
      cid: savedComment.cid,
      rid: savedComment.rid,
      tid: savedComment.tid,
      c_user: {
        uid: commentUser.uid,
        name: commentUser.name,
        avatar: commentUser.avatar
      },
      to_user: {
        uid: toUser.uid,
        name: toUser.name
      },
      content: savedComment.content,
      likes: savedComment.likes
    }

    await session.commitTransaction()
    session.endSession()

    return responseData
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }
})
