import mongoose from 'mongoose'
import GalgameModel from '~/server/models/galgame'
import GalgamePRModel from '~/server/models/galgame-pr'
import UserModel from '~/server/models/user'
import type { H3Event } from 'h3'

const checkMerge = async (event: H3Event) => {
  const { gprid }: { gprid: string } = await readBody(event)
  if (!gprid) {
    return kunError(event, 10507)
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

  if (
    userInfo.uid !== galgame.uid &&
    user.moemoepoint < 1100 &&
    user.roles < 2
  ) {
    return kunError(event, 10632)
  }

  return { uid: userInfo.uid, gprid, gid }
}

export default defineEventHandler(async (event) => {
  const result = await checkMerge(event)
  if (!result) {
    return
  }
  const { uid, gprid, gid } = result

  const galgamePR = await GalgamePRModel.findOne({ gprid }).lean()
  if (!galgamePR) {
    return kunError(event, 10610)
  }
  if (galgamePR.status !== 0) {
    return kunError(event, 10633)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    await GalgamePRModel.updateOne({ gprid }, { status: 1 })

    await createGalgameHistory({
      gid: galgamePR.gid,
      uid,
      time: Date.now(),
      action: 'merged',
      type: 'pr',
      content: `#${galgamePR.index}`
    })

    if (uid !== galgamePR.uid) {
      await GalgameModel.updateOne(
        { gid },
        {
          ...galgamePR.galgame,
          $addToSet: { contributor: { $each: [galgamePR.uid, uid] } }
        }
      )

      await UserModel.updateOne(
        { uid: galgamePR.uid },
        { $inc: { moemoepoint: 1 } }
      )

      await createMessage(
        uid,
        galgamePR.uid,
        'merged',
        `#${galgamePR.index}`,
        -galgamePR.gid
      )
    } else {
      await GalgameModel.updateOne({ gid }, { ...galgamePR.galgame })
    }

    await session.commitTransaction()

    return 'MOEMOE merged galgame pull request successfully!'
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
