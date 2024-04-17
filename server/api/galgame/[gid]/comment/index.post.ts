import mongoose from 'mongoose'
import UserModel from '~/server/models/user'
import GalgameCommentModel from '~/server/models/galgame-comment'
import type { H3Event } from 'h3'

const readReplyData = async (event: H3Event) => {
  const { toUid, content }: { toUid: string; content: string } =
    await readBody(event)
  if (!content) {
    return kunError(event, 10507)
  }
  if (content.trim().length > 1007) {
    return kunError(event, 10634)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10210)
  }

  return {
    gid: parseInt(gid),
    c_uid: uid,
    to_uid: toUid ? parseInt(toUid) : 0,
    content
  }
}

export default defineEventHandler(async (event) => {
  const result = await readReplyData(event)
  if (!result) {
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    await GalgameCommentModel.create(result)

    if (result.to_uid && result.c_uid !== result.to_uid) {
      await UserModel.updateOne(
        { uid: result.to_uid },
        { $inc: { moemoepoint: 1 } }
      )

      await createMessage(
        result.c_uid,
        result.to_uid,
        'commented',
        result.content.slice(0, 233),
        -result.gid
      )
    }

    await session.commitTransaction()

    return 'MOEMOE publish galgame comment successfully!'
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
