import mongoose from 'mongoose'
import GalgameModel from '~/server/models/galgame'
import GalgameResourceModel from '~/server/models/galgame-resource'
import UserModel from '~/server/models/user'
import { checkGalgameResourcePublish } from '../../utils/checkGalgameResourcePublish'
import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'
import type { GalgameResource } from '~/types/api/galgame-resource'
import type { H3Event } from 'h3'

const getResourceData = async (event: H3Event) => {
  const result: GalgameResourceStoreTemp = await readBody(event)
  if (!result) {
    return kunError(event, 10507)
  }
  const res = checkGalgameResourcePublish(result)
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
  const user = await UserModel.findOne({ uid })
  if (!user) {
    return kunError(event, 10101)
  }

  return {
    ...result,
    gid,
    uid
  }
}

export default defineEventHandler(async (event) => {
  const result = await getResourceData(event)
  if (!result) {
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const newGalgameResource = new GalgameResourceModel({
      ...result,
      time: Date.now()
    })

    const savedGalgameResource = await newGalgameResource.save()

    await UserModel.updateOne(
      { uid: result.uid },
      {
        $addToSet: {
          galgame_resource: savedGalgameResource.grid,
          contribute_galgame: result.gid
        },
        $inc: { daily_galgame_count: 1, moemoepoint: 5 }
      }
    )

    await GalgameModel.updateOne(
      { gid: result.gid },
      {
        $addToSet: {
          contributor: result.uid,
          resources: savedGalgameResource.grid,
          type: result.type,
          language: result.language,
          platform: result.platform
        }
      }
    )

    await session.commitTransaction()

    const resource: GalgameResource = { ...savedGalgameResource }
    return resource
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
