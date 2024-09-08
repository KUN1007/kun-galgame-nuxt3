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
  const { toUid, toFloor, tags, content, time }: TopicCreateReplyRequestData =
    await readBody(event)

  const res = checkReplyPublish(tags, content, time)
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

  const deduplicatedTags = Array.from(new Set(tags))

  return {
    tid: parseInt(tid),
    uid: userInfo.uid,
    toUid,
    toFloor,
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
  const { tid, uid, toUid, toFloor, tags, content, time } = result

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
      r_uid: uid,
      to_uid: toUid,
      to_floor: toFloor,
      floor,
      tags,
      content,
      time
    })

    const user = await UserModel.findOneAndUpdate(
      { uid: newReply.r_uid },
      { $addToSet: { reply: newReply.rid } }
    )

    const toUser = await UserModel.findOne({ uid: newReply.to_uid })

    await TopicModel.updateOne(
      { tid },
      {
        $addToSet: { replies: newReply.rid },
        $inc: { popularity: 5 },
        $set: { time: Date.now() }
      }
    )

    if (tags.length) {
      await createTagsByTidAndRid(tid, newReply.rid, tags, [])
    }

    if (uid !== toUid) {
      await UserModel.updateOne(
        { uid: newReply.to_uid },
        { $inc: { moemoepoint: 2 } }
      )

      await createMessage(
        uid,
        toUid,
        'replied',
        newReply.content.slice(0, 233),
        tid
      )
    }

    const response: TopicReply = {
      rid: newReply.rid,
      tid: newReply.tid,
      floor: newReply.floor,
      toFloor: newReply.to_floor,
      user: {
        uid: user!.uid,
        name: user!.name,
        avatar: user!.avatar,
        moemoepoint: user!.moemoepoint
      },
      toUser: {
        uid: toUser!.uid,
        name: toUser!.name
      },
      edited: newReply.edited,
      content: newReply.content,
      upvotes: {
        count: 0,
        isUpvoted: false
      },
      upvoteTime: newReply.upvote_time,
      likes: {
        count: 0,
        isLiked: false
      },
      dislikes: {
        count: 0,
        isDisliked: false
      },
      tags: [],
      time: newReply.time,
      comment: []
    }

    await session.commitTransaction()

    return response
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
