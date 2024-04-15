import GalgamePRModel from '~/server/models/galgame-pr'
import type { GalgamePRDetails } from '~/types/api/galgame-pr'

export default defineEventHandler(async (event) => {
  const { gprid }: { gprid: string } = await getQuery(event)
  if (!gprid) {
    return kunError(event, 10507)
  }

  const pr = await GalgamePRModel.findOne({ gprid })
    .populate('user', 'uid avatar name')
    .lean()
  if (!pr) {
    return kunError(event, 10622)
  }

  const details: GalgamePRDetails = {
    gid: pr.gid,
    gprid: pr.gprid,
    status: pr.status,
    time: pr.created,
    completedTime: pr.completed_time,
    user: {
      uid: pr.user[0].uid,
      name: pr.user[0].name,
      avatar: pr.user[0].avatar
    },
    galgame: pr.galgame
  }

  return details
})
