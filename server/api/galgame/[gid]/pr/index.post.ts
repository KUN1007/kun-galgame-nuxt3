import mongoose from 'mongoose'
import GalgameModel from '~/server/models/galgame'
import GalgamePRModel from '~/server/models/galgame-pr'
import { isDeepEmpty } from '~/utils/isDeepEmpty'
import { checkGalgamePR } from '../../utils/checkGalgamePR'
import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

export default defineEventHandler(async (event) => {
  const galgame: GalgameStoreTemp = await readBody(event)
  const res = checkGalgamePR(galgame)
  if (res) {
    return kunError(event, res)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const originalGalgame = await GalgameModel.findOne({
    gid: galgame.gid
  }).lean()
  if (!originalGalgame) {
    return kunError(event, 10610)
  }
  const { gid, name, introduction, series, alias, official, engine, tags } =
    originalGalgame

  const diffGalgame = compareObjects(galgame, {
    gid,
    name,
    introduction,
    series: series.map((s) => s.toString()),
    alias,
    official,
    engine,
    tags
  })

  if (isDeepEmpty(diffGalgame)) {
    return kunError(event, 10644)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const maxIndexPR = await GalgamePRModel.findOne({ gid })
      .sort({ index: -1 })
      .lean()
    const baseIndex = maxIndexPR ? maxIndexPR.index : 0
    const index = baseIndex + 1

    await GalgamePRModel.create({
      gid: galgame.gid,
      uid: userInfo.uid,
      index,
      galgame: diffGalgame
    })

    await createGalgameHistory({
      gid,
      uid: userInfo.uid,
      time: Date.now(),
      action: 'created',
      type: 'pr',
      content: ''
    })

    if (userInfo.uid !== originalGalgame.uid) {
      await createMessage(
        userInfo.uid,
        originalGalgame.uid,
        'requested',
        JSON.stringify(diffGalgame).slice(0, 233),
        0,
        gid
      )
    }

    await session.commitTransaction()

    return 'MOEMOE committed galgame pull request successfully!'
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
