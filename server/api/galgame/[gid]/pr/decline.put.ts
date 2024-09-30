import mongoose from 'mongoose'
import GalgameModel from '~/server/models/galgame'
import GalgamePRModel from '~/server/models/galgame-pr'
import UserModel from '~/server/models/user'
import type { H3Event } from 'h3'

const checkUpdate = async (event: H3Event) => {
  const { gprid, note }: { gprid: number; note: string } = await readBody(event)
  if (!gprid || !note) {
    return kunError(event, 10507)
  }
  if (!note.trim() || note.length > 1007) {
    return kunError(event, 10631)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const user = await UserModel.findOne({ uid: userInfo.uid }).lean()
  if (!user) {
    return kunError(event, 10101)
  }

  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10507)
  }
  const galgame = await GalgameModel.findOne({ gid }).lean()
  if (!galgame) {
    return kunError(event, 10610)
  }

  if (userInfo.uid !== galgame.uid && user.roles < 2) {
    return kunError(event, 10632)
  }

  return { uid: userInfo.uid, gprid, note }
}

export default defineEventHandler(async (event) => {
  const result = await checkUpdate(event)
  if (!result) {
    return
  }
  const { uid, gprid, note } = result

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const galgamePR = await GalgamePRModel.findOneAndUpdate(
      { gprid },
      { status: 2, note, galgame: {} }
    ).lean()
    if (!galgamePR) {
      return kunError(event, 10610)
    }
    if (galgamePR.status !== 0) {
      return kunError(event, 10633)
    }

    await createGalgameHistory({
      gid: galgamePR.gid,
      uid,
      time: Date.now(),
      action: 'declined',
      type: 'pr',
      content: `#${galgamePR.index} ${note}`
    })

    if (uid !== galgamePR.uid) {
      await createMessage(
        uid,
        galgamePR.uid,
        'declined',
        `#${galgamePR.index} ${note}`,
        0,
        galgamePR.gid
      )
    }

    await session.commitTransaction()
    return 'MOEMOE declined galgame pull request successfully!'
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
