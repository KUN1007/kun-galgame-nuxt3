import UserModel from '~/server/models/user'
import GalgamePRModel from '~/server/models/galgame-pr'
import type { GalgamePR } from '~/types/api/galgame-pr'

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10507)
  }

  const { page, limit }: { page: string; limit: string } = await getQuery(event)
  if (!page || !limit) {
    return kunError(event, 10507)
  }
  if (limit !== '7') {
    return kunError(event, 10209)
  }

  const skip = (parseInt(page) - 1) * parseInt(limit)
  const totalCount = await GalgamePRModel.countDocuments({ gid }).lean()

  const data = await GalgamePRModel.find({ gid })
    .sort({ created: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const prs: GalgamePR[] = data.map((pr) => ({
    gprid: pr.gprid,
    gid: pr.gid,
    index: pr.index,
    status: pr.status,
    time: pr.created,
    completedTime: pr.completed_time,
    user: {
      uid: pr.user[0].uid,
      name: pr.user[0].name,
      avatar: pr.user[0].avatar
    }
  }))

  return { prs, totalCount }
})
