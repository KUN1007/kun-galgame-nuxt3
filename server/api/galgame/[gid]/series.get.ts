import GalgameModel from '~/server/models/galgame'

interface GalgameSeries {
  gid: number
  name: KunLanguage
}

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10609)
  }

  const galgame = await GalgameModel.findOne({ gid, status: { $ne: 1 } }).lean()
  if (!galgame) {
    return kunError(event, 10610)
  }

  const series: GalgameSeries[] = await GalgameModel.find({
    gid: { $in: galgame.series }
  }).select({ _id: 0, gid: 1, name: 1 })

  return series
})
