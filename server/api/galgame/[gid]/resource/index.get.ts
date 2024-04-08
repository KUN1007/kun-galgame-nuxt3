import GalgameResourceModel from '~/server/models/galgame-resource'
import type { GalgameResourceDetails } from '~/types/api/galgame-resource'

export default defineEventHandler(async (event) => {
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    kunError(event, 10507)
    return
  }

  const data = await GalgameResourceModel.findOne({ grid, status: { $ne: 1 } })
    .populate('user', 'uid avatar name')
    .lean()
  if (!data) {
    kunError(event, 10622)
    return
  }

  const resource: GalgameResourceDetails = {
    ...data,
    likes: data.likes.length,
    user: {
      uid: data.user[0].uid,
      name: data.user[0].name,
      avatar: data.user[0].avatar
    }
  }

  return resource
})
