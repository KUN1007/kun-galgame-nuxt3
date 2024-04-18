import mongoose from 'mongoose'
import TopicModel from '~/server/models/topic'
import ReplyModel from '~/server/models/reply'
import UserModel from '~/server/models/user'
import { checkReplyPublish } from '../../utils/checkReplyPublish'
import type { H3Event } from 'h3'
import type {
  TopicReply,
  TopicCreateReplyRequestData
} from '~/types/api/topic-reply'

const readReplyData = async (event: H3Event) => {
  const { to_uid, to_floor, tags, content, time }: TopicCreateReplyRequestData =
    await readBody(event)

  const res = checkReplyPublish(tags, content, parseInt(time))
  if (res) {
    return kunError(event, res)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    return kunError(event, 10210)
  }

  const deduplicatedTags = Array.from(new Set(tags))

  return {
    tid: parseInt(tid),
    r_uid: uid,
    to_uid,
    to_floor,
    tags: deduplicatedTags,
    content,
    time
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

    const newReply = await ReplyModel.create({
      tid,
      r_uid,
      to_uid,
      to_floor,
      floor,
      tags,
      content,
      time
    })

    const replyUser = await UserModel.findOneAndUpdate(
      { uid: newReply.r_uid },
      { $addToSet: { reply: newReply.rid } }
    )
    if (!replyUser) {
      return kunError(event, 10101)
    }

    const replyToUser = await UserModel.findOneAndUpdate(
      { uid: newReply.to_uid },
      { $inc: { moemoepoint: 2 } }
    )
    if (!replyToUser) {
      return kunError(event, 10101)
    }

    await TopicModel.updateOne(
      { tid },
      {
        $addToSet: { replies: newReply.rid },
        $inc: { popularity: 5 }
      }
    )

    if (tags.length) {
      await createTagsByTidAndRid(tid, newReply.rid, tags, [])
    }

    if (r_uid.toString() !== to_uid) {
      await createMessage(
        r_uid,
        parseInt(to_uid),
        'replied',
        newReply.content.slice(0, 233),
        tid
      )
    }

    const responseData: TopicReply = {
      rid: newReply.rid,
      tid: newReply.tid,
      floor: newReply.floor,
      to_floor: newReply.to_floor,
      r_user: {
        uid: replyUser.uid,
        name: replyUser.name,
        avatar: replyUser.avatar,
        moemoepoint: replyUser.moemoepoint
      },
      to_user: {
        uid: replyToUser.uid,
        name: replyToUser.name
      },
      edited: newReply.edited,
      content: newReply.content,
      upvotes: newReply.upvotes,
      upvote_time: newReply.upvote_time,
      likes: newReply.likes,
      dislikes: newReply.dislikes,
      tags: newReply.tags,
      time: newReply.time,
      comment: newReply.comment
    }

    await session.commitTransaction()

    return responseData
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
