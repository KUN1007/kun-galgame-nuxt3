import UserModel from '~/server/models/user'
import GalgameResourceModel from '~/server/models/galgame-resource'
import type { GalgameResourceDetails } from '~/types/api/galgame-resource'

export default defineEventHandler(async (event) => {
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    return kunError(event, 10507)
  }

  const data = await GalgameResourceModel.findOne({ grid })
    .populate('user', 'uid avatar name', UserModel)
    .lean()
  if (!data) {
    return kunError(event, 10622)
  }

  const resource: GalgameResourceDetails = {
    gid: data.gid,
    grid: data.grid,
    uid: data.uid,
    type: data.type,
    language: data.language,
    platform: data.platform,
    size: data.size,
    time: data.time,
    status: data.status,
    likes: data.likes,
    link: data.link,
    code: data.code,
    password: data.password,
    note: data.note,
    user: {
      uid: data.user[0].uid,
      name: data.user[0].name,
      avatar: data.user[0].avatar
    }
  }

  return resource
})
