import CommentModel from '~/server/models/comment'
import type { UserComment } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const { cidArray } = getQuery(event)

  if (!cidArray) {
    return []
  }

  const comments = await CommentModel.find({ cid: { $in: cidArray } }).limit(50)

  const responseData: UserComment[] = comments.map((comment) => ({
    tid: comment.tid,
    content: comment.content.substring(0, 107),
  }))

  return responseData
})
