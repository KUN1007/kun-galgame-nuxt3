import GalgameResourceModel from '~/server/models/galgame-resource'

export default defineEventHandler(async (event) => {
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    return kunError(event, 10507)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const resource = await GalgameResourceModel.findOne({ grid })
  if (!resource) {
    return kunError(event, 10622)
  }
  if (resource.uid !== userInfo.uid) {
    return kunError(event, 10623)
  }

  await GalgameResourceModel.updateOne({ grid }, { status: 0 }).lean()

  return 'MOEMOE mark galgame resource link valid successfully!'
})
