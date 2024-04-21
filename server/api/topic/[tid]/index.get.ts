import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import type { TopicDetail } from '~/types/api/topic'

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    return kunError(event, 10210)
  }

  const topic = await TopicModel.findOneAndUpdate(
    { tid },
    { $inc: { views: 1, popularity: 0.1 } }
  )
    .populate('user', 'uid name avatar moemoepoint', UserModel)
    .lean()
  if (!topic) {
    return kunError(event, 10211)
  }
  if (topic.status === 1) {
    return 'banned'
  }

  const userInfo = await getCookieTokenInfo(event)
  const uid = userInfo?.uid ?? 0

  const data: TopicDetail = {
    tid: topic.tid,
    title: topic.title,
    views: topic.views,
    likes: {
      count: topic.likes.length,
      isLiked: topic.likes.includes(uid)
    },
    dislikes: {
      count: topic.dislikes.length,
      isDisliked: topic.dislikes.includes(uid)
    },
    favorites: {
      count: topic.favorites.length,
      isFavorite: topic.favorites.includes(uid)
    },
    time: topic.time,
    content: topic.content,
    upvotes: {
      count: topic.upvotes.length,
      isUpvoted: topic.upvotes.includes(uid)
    },
    tags: topic.tags,
    edited: topic.edited,
    user: {
      uid: topic.user[0].uid,
      name: topic.user[0].name,
      avatar: topic.user[0].avatar,
      moemoepoint: topic.user[0].moemoepoint
    },
    replies: topic.replies,
    status: topic.status,
    share: topic.share,
    category: topic.category,
    section: topic.section,
    popularity: topic.popularity,
    upvoteTime: topic.upvote_time
  }

  return data
})
