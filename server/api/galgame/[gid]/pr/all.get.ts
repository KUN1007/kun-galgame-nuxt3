import GalgamePRModel from '~/server/models/galgame-pr'
import type { GalgamePR } from '~/types/api/galgame-pr'

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10507)
  }

  const data = await GalgamePRModel.find({ gid })
    .sort({ created: -1 })
    .populate('user', 'uid avatar name')
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

  return prs
})
