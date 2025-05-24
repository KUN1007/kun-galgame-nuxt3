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
  const uid = userInfo.uid

  const resource = await GalgameResourceModel.findOne({ grid })
  if (!resource) {
    return kunError(event, 10622)
  }
  if (resource.status === 1) {
    return kunError(event, 10625)
  }

  await GalgameResourceModel.updateOne({ grid }, { status: 1 }).lean()

  await createMessage(
    uid,
    resource.uid,
    'expired',
    resource.link[0].slice(0, 233),
    0,
    resource.gid
  )

  return 'MOEMOE expired galgame resource link successfully!'
})
