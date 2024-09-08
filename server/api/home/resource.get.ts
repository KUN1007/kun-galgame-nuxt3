import GalgameModel from '~/server/models/galgame'
import GalgameResourceModel from '~/server/models/galgame-resource'
import type { HomeGalgameResources } from '~/types/api/home'

const getHomeGalgameResources = async (page: number, limit: number) => {
  const skip = (page - 1) * limit

  const resources = await GalgameResourceModel.find()
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .populate('game', 'name', GalgameModel)
    .lean()

  const data: HomeGalgameResources[] = resources.map((resource) => ({
    gid: resource.gid,
    grid: resource.grid,
    uid: resource.uid,
    type: resource.type,
    language: resource.language,
    platform: resource.platform,
    size: resource.size,
    status: resource.status,
    likes: resource.likes,

    name: resource.game[0].name,
    time: resource.time
  }))

  return data
}

export default defineEventHandler(async (event) => {
  const { page, limit }: KunPagination = await getQuery(event)
  if (limit !== '10') {
    return kunError(event, 10209)
  }
  const result = await getHomeGalgameResources(parseInt(page), parseInt(limit))

  return result
})
