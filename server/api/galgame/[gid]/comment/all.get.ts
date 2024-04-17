import GalgameCommentModel from '~/server/models/galgame-comment'
import type { GalgameComment } from '~/types/api/galgame-comment'

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
  if (limit !== '10') {
    return kunError(event, 10209)
  }

  const skip = (parseInt(page) - 1) * parseInt(limit)
  const totalCount = await GalgameCommentModel.countDocuments({ gid }).lean()

  const data = await GalgameCommentModel.find({ gid })
    .sort({ created: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('cuid', 'uid avatar name')
    .populate('touid', 'uid name')
    .lean()

  const commentData: GalgameComment[] = data.map((comment) => ({
    gcid: comment.gcid,
    gid: comment.gid,
    time: comment.created,
    content: comment.content,
    user: {
      uid: comment.cuid[0].uid,
      name: comment.cuid[0].name,
      avatar: comment.cuid[0].avatar
    },
    toUser: comment.touid?.length
      ? {
          uid: comment.touid[0].uid,
          name: comment.touid[0].name
        }
      : 0
  }))

  return { commentData, totalCount }
})
