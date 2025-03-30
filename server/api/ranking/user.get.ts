import UserModel from '~/server/models/user'
import type {
  UserSortFieldRanking,
  RankingGetUserRequestData,
  RankingUsers
} from '~/types/api/ranking'

const getUserRanking = async (
  page: number,
  limit: number,
  sortField: UserSortFieldRanking,
  sortOrder: KunOrder
) => {
  const skip = (page - 1) * limit

  const sortOptions: Record<string, 1 | -1> = {
    [sortField]: sortOrder === 'asc' ? 1 : -1
  }

  const numberField = ['moemoepoint', 'upvote', 'like']
  if (numberField.includes(sortField)) {
    const users = await UserModel.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()

    const responseData: RankingUsers[] = users.map((user) => ({
      uid: user.uid,
      name: user.name,
      avatar: user.avatar,
      field: user[sortField] as number
    }))

    return responseData
  } else {
    const users: RankingUsers[] = await UserModel.aggregate([
      { $unwind: `$${sortField}` },
      {
        $group: {
          _id: '$_id',
          uid: { $first: '$uid' },
          name: { $first: '$name' },
          avatar: { $first: '$avatar' },
          [sortField]: { $sum: 1 }
        }
      },
      { $sort: sortOptions },
      { $skip: skip },
      { $limit: limit },
      {
        $project: { _id: 0, uid: 1, name: 1, avatar: 1, field: `$${sortField}` }
      }
    ])

    return users
  }
}

export default defineEventHandler(async (event) => {
  const { page, limit, sortField, sortOrder }: RankingGetUserRequestData =
    await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder) {
    return kunError(event, 10507)
  }
  if (limit !== '100') {
    return kunError(event, 10209)
  }

  const rankingUserCache = await useStorage('redis').getItem(
    `ranking:user:${page}:${limit}:${sortField}:${sortOrder}`
  )
  if (rankingUserCache) {
    return rankingUserCache as RankingUsers[]
  }

  const users = await getUserRanking(
    parseInt(page),
    parseInt(limit),
    sortField,
    sortOrder
  )

  await useStorage('redis').setItem(
    `ranking:user:${page}:${limit}:${sortField}:${sortOrder}`,
    users,
    { ttl: 17 * 60 }
  )

  return users
})
