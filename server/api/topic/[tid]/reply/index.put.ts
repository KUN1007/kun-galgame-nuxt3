import ReplyModel from '~/server/models/reply'
import mongoose from 'mongoose'
import { checkReplyPublish } from '../../utils/checkReplyPublish'
import type { TopicUpdateReplyRequestData } from '~/types/api/topic-reply'

const updateReply = async (
  uid: number,
  tid: number,
  rid: number,
  content: string,
  tags: string[],
  edited: number
) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    await ReplyModel.updateOne({ rid, r_uid: uid }, { tags, edited, content })

    await updateTagsByTidAndRid(tid, rid, tags, [])

    await session.commitTransaction()
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

  const { rid, content, tags, edited }: TopicUpdateReplyRequestData =
    await readBody(event)

  const result = checkReplyPublish(tags, content, parseInt(edited))
  if (result) {
    return kunError(event, result)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  await updateReply(
    uid,
    parseInt(tid),
    parseInt(rid),
    content,
    tags,
    parseInt(edited)
  )

  return 'MOEMOE update reply successfully!'
})
