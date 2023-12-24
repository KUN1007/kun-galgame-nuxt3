import TopicModel from '~/server/models/topic'
import mongoose from 'mongoose'
import { checkTopicPublish } from '../utils/checkTopicPublish'
import type { EditUpdateTopicRequestData } from '~/types/api/topic'

const updateTopic = async (
  uid: number,
  tid: number,
  title: string,
  content: string,
  tags: string[],
  category: string[],
  edited: number
) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    await TopicModel.updateOne(
      { tid, uid },
      { title, content, tags, category, edited }
    )

    await updateTagsByTidAndRid(tid, 0, tags, category)

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

  const { title, content, tags, category, edited }: EditUpdateTopicRequestData =
    await readBody(event)

  const res = checkTopicPublish(
    title,
    content,
    tags,
    category,
    parseInt(edited)
  )
  if (res) {
    kunError(event, res)
    return
  }

  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115)
    return
  }
  const uid = userInfo.uid

  await updateTopic(
    uid,
    parseInt(tid),
    title,
    content,
    tags,
    category,
    parseInt(edited)
  )

  return 'MOEMOE update topic successfully!'
})
