import GalgameResourceModel from '~/server/models/galgame-resource'
import type { GalgameResource } from '~/types/api/galgame-resource'

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10507)
  }

  const data = await GalgameResourceModel.find({ gid })
    .sort({ created: -1 })
    .lean()

  const galgames: GalgameResource[] = data.map((galgame) => ({
    gid: galgame.gid,
    grid: galgame.grid,
    uid: galgame.uid,
    type: galgame.type,
    language: galgame.language,
    platform: galgame.platform,
    size: galgame.size,
    time: galgame.time,
    status: galgame.status,
    likes: galgame.likes
  }))

  return galgames
})
