import CommentModel from '~/server/models/comment'

export default defineEventHandler(async (event) => {
  const { rid }: { rid: string } = await getQuery(event)
  if (!rid) {
    kunError(event, 10507)
    return
  }

  const comment = await CommentModel.find({ rid })
    .populate('cuid', 'uid avatar name')
    .populate('touid', 'uid name')
    .lean()

  const replyComments = comment.map((comment) => ({
    cid: comment.cid,
    rid: comment.rid,
    tid: comment.tid,
    c_user: {
      uid: comment.cuid[0].uid,
      avatar: comment.cuid[0].avatar,
      name: comment.cuid[0].name
    },
    to_user: {
      uid: comment.touid[0].uid,
      name: comment.touid[0].name
    },
    content: comment.content,
    likes: comment.likes
  }))

  return replyComments
})
