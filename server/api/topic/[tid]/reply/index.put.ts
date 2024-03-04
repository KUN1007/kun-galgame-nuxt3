import ReplyModel from '~/server/models/reply'
import mongoose from 'mongoose'
import { checkReplyPublish } from '../../utils/checkReplyPublish'
import type { TopicUpdateReplyRequestData } from '~/types/api/reply'

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
    await ReplyModel.updateOne(
      { rid, r_uid: uid },
      { tags, edited, content }
    )

    await updateTagsByTidAndRid(tid, rid, tags, [])

    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    kunError(event, 10210)
    return
  }

  const { rid, content, tags, edited }: TopicUpdateReplyRequestData =
    await readBody(event)

  const result = checkReplyPublish(tags, content, parseInt(edited))
  if (result) {
    kunError(event, result)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
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
