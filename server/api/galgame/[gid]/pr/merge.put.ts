import mongoose from 'mongoose'
import GalgameModel from '~/server/models/galgame'
import GalgamePRModel from '~/server/models/galgame-pr'
import UserModel from '~/server/models/user'
import type { H3Event } from 'h3'

const checkMerge = async (event: H3Event) => {
  const { gprid }: { gprid: number } = await readBody(event)
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

  if (userInfo.uid !== galgame.uid && user.roles < 2) {
    return kunError(event, 10632)
  }

  return { uid: userInfo.uid, gprid, gid, galgame }
}

export default defineEventHandler(async (event) => {
  const result = await checkMerge(event)
  if (!result) {
    return
  }
  const { uid, gprid, gid, galgame } = result

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
    await GalgamePRModel.updateOne(
      { gprid },
      { status: 1, completed_time: Date.now() }
    )

    await createGalgameHistory({
      gid: galgamePR.gid,
      uid,
      time: Date.now(),
      action: 'merged',
      type: 'pr',
      content: `#${galgamePR.index}`
    })

    await GalgameModel.updateOne(
      { gid },
      {
        name: mergeLanguages(galgame.name, galgamePR.galgame?.name ?? {}),
        introduction: mergeLanguages(
          galgame.introduction,
          galgamePR.galgame?.introduction ?? {}
        ),
        alias: galgamePR.galgame?.alias?.filter((str) => str !== ''),
        series: galgamePR.galgame?.series?.map((s) => parseInt(s)),
        official: galgamePR.galgame?.official?.filter((str) => str !== ''),
        engine: galgamePR.galgame?.engine?.filter((str) => str !== ''),
        tags: galgamePR.galgame?.tags?.filter((str) => str !== ''),
        $addToSet: { contributor: uid }
      }
    )

    await UserModel.updateOne(
      { uid },
      { $addToSet: { contribute_galgame: gid } }
    )

    if (uid !== galgamePR.uid) {
      await GalgameModel.updateOne(
        { gid },
        { $addToSet: { contributor: galgamePR.uid } }
      )

      await UserModel.updateOne(
        { uid: galgamePR.uid },
        {
          $inc: { moemoepoint: 1 },
          $addToSet: { contribute_galgame: gid }
        }
      )

      await createMessage(
        uid,
        galgamePR.uid,
        'merged',
        `#${galgamePR.index}`,
        0,
        galgamePR.gid
      )
    }

    await session.commitTransaction()

    return 'MOEMOE merged galgame pull request successfully!'
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
