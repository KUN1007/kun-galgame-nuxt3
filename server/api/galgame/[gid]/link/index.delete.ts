import mongoose from 'mongoose'
import GalgameLinkModel from '~/server/models/galgame-link'

export default defineEventHandler(async (event) => {
  const { glid }: { glid: string } = await getQuery(event)
  if (!glid) {
    return kunError(event, 10507)
  }

  const link = await GalgameLinkModel.findOne({ glid }).lean()
  if (!link) {
    return kunError(event, 10628)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  if (link.uid !== userInfo.uid) {
    return kunError(event, 10623)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    await GalgameLinkModel.deleteOne({ glid })

    await createGalgameHistory({
      gid: link.gid,
      uid: link.uid,
      time: Date.now(),
      action: 'deleted',
      type: 'link',
      content: link.name
    })

    return 'MOEMOE delete visualnovel-related link successfully!'
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
