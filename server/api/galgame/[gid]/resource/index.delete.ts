import GalgameResourceModel from '~/server/models/galgame-resource'
import type { GalgameResourceDetails } from '~/types/api/galgame-resource'

export default defineEventHandler(async (event) => {
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    kunError(event, 10507)
    return
  }

  const resource = await GalgameResourceModel.findOne({
    grid,
    status: { $ne: 1 }
  }).lean()
  if (!resource) {
    kunError(event, 10622)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  if (resource.uid !== userInfo.uid) {
    kunError(event, 10623)
    return
  }

  return resource
})
