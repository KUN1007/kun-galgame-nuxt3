import mongoose from 'mongoose'
import TopicModel from '~/server/models/topic'
import UserModel from '~/server/models/user'
import { checkTopicPublish } from './utils/checkTopicPublish'
import type { H3Event } from 'h3'
import type { EditCreateTopicRequestData } from '~/types/api/topic'

const readTopicData = async (event: H3Event) => {
  const {
    title,
    content,
    time,
    tags,
    category,
    section
  }: EditCreateTopicRequestData = await readBody(event)

  const res = checkTopicPublish(
    title,
    content,
    tags,
    category,
    section,
    parseInt(time)
  )
  if (res) {
    return kunError(event, res)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const deduplicatedTags = Array.from(new Set(tags))

  return {
    title,
    content,
    time,
    tags: deduplicatedTags,
    category,
    section,
    uid
  }
}

export default defineEventHandler(async (event) => {
  const result = await readTopicData(event)
  if (!result) {
    return
  }
  const { title, content, time, tags, category, section, uid } = result

  const user = await UserModel.findOne({ uid })
  if (!user) {
    return kunError(event, 10101)
  }

  if (user.moemoepoint / 10 < user.daily_topic_count) {
    return kunError(event, 10201)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const newTopic = new TopicModel({
      title,
      content,
      time,
      tags,
      category,
      section,
      uid
    })

    const savedTopic = await newTopic.save()

    await UserModel.updateOne(
      { uid },
      {
        $addToSet: { topic: savedTopic.tid },
        $inc: { daily_topic_count: 1 }
      }
    )

    await createTagsByTidAndRid(savedTopic.tid, 0, tags, category)

    await session.commitTransaction()

    return savedTopic.tid
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
