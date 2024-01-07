import UserModel from '~/server/models/user'
import type {
  UserSortFieldRanking,
  SortOrder,
  RankingGetUserRequestData,
  RankingUsers,
} from '~/types/api/ranking'

const getUserRanking = async (
  page: number,
  limit: number,
  sortField: UserSortFieldRanking,
  sortOrder: SortOrder
) => {
  const skip = (page - 1) * limit

  const sortOptions: Record<string, 'asc' | 'desc'> = {
    [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
  }

  const users = await UserModel.find()
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean()

  const responseData: RankingUsers[] = users.map((user) => ({
    uid: user.uid,
    name: user.name,
    avatar: user.avatar,
    field: user[sortField],
  }))

  return responseData
}

export default defineEventHandler(async (event) => {
  const { page, limit, sortField, sortOrder }: RankingGetUserRequestData =
    await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder) {
    kunError(event, 10507)
    return
  }
  if (limit !== '30') {
    kunError(event, 10209)
    return
  }

  const topics = await getUserRanking(
    parseInt(page),
    parseInt(limit),
    sortField,
    sortOrder
  )

  return topics
})
