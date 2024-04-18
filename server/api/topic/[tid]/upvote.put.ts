import mongoose from 'mongoose'
import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'

const updateTopicUpvote = async (uid: number, tid: number) => {
  const topic = await TopicModel.findOne({ tid })
  if (!topic) {
    return 10211
  }

  const userInfo = await UserModel.findOne({ uid })
  if (!userInfo) {
    return 10115
  }

  const moemoepoint = userInfo.moemoepoint
  if (moemoepoint < 1100) {
    return 10202
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await TopicModel.updateOne(
      { tid },
      {
        $set: { upvote_time: Date.now() },
        $push: { upvotes: uid },
        $inc: { popularity: 17 }
      }
    )

    await UserModel.updateOne(
      { uid },
      {
        $inc: { moemoepoint: -7 },
        $addToSet: { upvote_topic: tid }
      }
    )

    await UserModel.updateOne(
      { uid: topic.uid },
      { $inc: { moemoepoint: 7, upvote: 1 } }
    )

    await createMessage(
      uid,
      topic.uid,
      'upvoted',
      topic.content.slice(0, 233),
      tid
    )

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

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const result = await updateTopicUpvote(userInfo.uid, parseInt(tid))
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE upvote topic successfully!'
})
