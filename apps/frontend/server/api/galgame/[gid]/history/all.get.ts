import UserModel from '~/server/models/user'
import GalgameHistoryModel from '~/server/models/galgame-history'
import type {
  GalgameHistoryAction,
  GalgameHistoryType,
  GalgameHistory
} from '~/types/api/galgame-history'

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    kunError(event, 10609)
    return
  }
  const { page, limit }: { page: string; limit: string } = await getQuery(event)
  if (!page || !limit) {
    return kunError(event, 10507)
  }
  if (limit !== '7') {
    return kunError(event, 10209)
  }

  const skip = (parseInt(page) - 1) * parseInt(limit)
  const totalCount = await GalgameHistoryModel.countDocuments({ gid }).lean()

  const data = await GalgameHistoryModel.find({ gid })
    .sort({ created: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const historyData: GalgameHistory[] = data.map((history) => ({
    gid: history.gid,
    time: history.time,
    action: history.action as GalgameHistoryAction,
    type: history.type as GalgameHistoryType,
    content: history.content,
    user: {
      uid: history.user[0].uid,
      name: history.user[0].name,
      avatar: history.user[0].avatar
    }
  }))

  return { historyData, totalCount }
})
