import GalgameModel from '~/server/models/galgame'

export default defineEventHandler(async (event) => {
  const { vndbId }: { vndbId: string } = await getQuery(event)
  if (!vndbId) {
    return kunError(event, 10507)
  }

  const galgame = await GalgameModel.countDocuments({ vndb_id: vndbId })
  if (galgame) {
    return kunError(event, 10641)
  }

  return 'The galgame is unique!'
})
