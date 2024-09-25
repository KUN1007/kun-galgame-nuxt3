import mongoose from 'mongoose'
import GalgameModel from '~/server/models/galgame'
import GalgameLinkModel from '~/server/models/galgame-link'
import { checkGalgameLinkPublish } from '../../utils/checkGalgameLinkPublish'
import type { H3Event } from 'h3'

const getLinkData = async (event: H3Event) => {
  const { name, link }: { name: string; link: string } = await readBody(event)
  if (!name || !link) {
    return kunError(event, 10507)
  }
  const res = checkGalgameLinkPublish(name, link)
  if (res) {
    return kunError(event, res)
  }
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  return {
    gid,
    uid,
    name,
    link
  }
}

export default defineEventHandler(async (event) => {
  const result = await getLinkData(event)
  if (!result) {
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    await GalgameLinkModel.create({ ...result })

    await GalgameModel.updateOne(
      { gid: result.gid },
      { $addToSet: { contributor: result.uid } }
    )

    await session.commitTransaction()

    await createGalgameHistory({
      gid: parseInt(result.gid),
      uid: result.uid,
      time: Date.now(),
      action: 'created',
      type: 'link',
      content: result.name
    })

    return 'MOEMOE create visualnovel-related link successfully!'
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
