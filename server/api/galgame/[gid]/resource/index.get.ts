import GalgameResourceModel from '~/server/models/galgame-resource'
import type { GalgameResourceDetails } from '~/types/api/galgame-resource'

export default defineEventHandler(async (event) => {
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    return kunError(event, 10507)
  }

  const data = await GalgameResourceModel.findOne({ grid })
    .populate('user', 'uid avatar name')
    .lean()
  if (!data) {
    return kunError(event, 10622)
  }

  const resource: GalgameResourceDetails = {
    ...data,
    user: {
      uid: data.user[0].uid,
      name: data.user[0].name,
      avatar: data.user[0].avatar
    }
  }

  return resource
})
