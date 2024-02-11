import mongoose from 'mongoose'
import TopicModel from '~/server/models/topic'
import ReplyModel from '~/server/models/reply'
import UserModel from '~/server/models/user'
import { checkReplyPublish } from '../../utils/checkReplyPublish'
import type { H3Event } from 'h3'
import type { TopicReply, TopicCreateReplyRequestData } from '~/types/api/reply'

const readReplyData = async (event: H3Event) => {
  const { to_uid, to_floor, tags, content, time }: TopicCreateReplyRequestData =
    await readBody(event)

  const res = checkReplyPublish(tags, content, parseInt(time))
  if (res) {
    kunError(event, res)
    return
  }

  const userInfo = getCookieTokenInfo(event)
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
    tid: parseInt(tid),
    r_uid: uid,
    to_uid,
    to_floor,
    tags,
    content,
    time,
  }
}

export default defineEventHandler(async (event) => {
  const result = await readReplyData(event)
  if (!result) {
    return
  }
  const { tid, r_uid, to_uid, to_floor, tags, content, time } = result

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
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

    const replyUser = await UserModel.findOneAndUpdate(
      { uid: savedReply.r_uid },
      { $addToSet: { reply: savedReply.rid }, $inc: { reply_count: 1 } }
    )
    if (!replyUser) {
      kunError(event, 10101)
      return
    }

    const replyToUser = await UserModel.findOneAndUpdate(
      { uid: savedReply.to_uid },
      { $inc: { moemoepoint: 2 } }
    )
    if (!replyToUser) {
      kunError(event, 10101)
      return
    }

    await TopicModel.updateOne(
      { tid },
      {
        $addToSet: { replies: savedReply.rid },
        $inc: { popularity: 5, replies_count: 1 },
      }
    )

    if (tags.length) {
      await createTagsByTidAndRid(tid, savedReply.rid, tags, [])
    }

    if (r_uid.toString() !== to_uid) {
      await createMessage(
        r_uid,
        parseInt(to_uid),
        'replied',
        savedReply.content.slice(233),
        tid
      )
    }

    const responseData: TopicReply = {
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

    await session.commitTransaction()
    session.endSession()

    return responseData
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }
})
