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
  section: string[],
  edited: number
) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    await TopicModel.updateOne(
      { tid, uid },
      { title, content, tags, category, section, edited }
    )

    await updateTagsByTidAndRid(tid, 0, tags, category)

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

  const {
    title,
    content,
    tags,
    category,
    section,
    edited
  }: EditUpdateTopicRequestData = await readBody(event)

  const res = checkTopicPublish(
    title,
    content,
    tags,
    category,
    section,
    parseInt(edited)
  )
  if (res) {
    return kunError(event, res)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  await updateTopic(
    uid,
    parseInt(tid),
    title,
    content,
    tags,
    category,
    section,
    parseInt(edited)
  )

  return 'MOEMOE update topic successfully!'
})
