import UserModel from '~/server/models/user'
import GalgameModel from '~/server/models/galgame'
import type {
  KunGalgameResourceTypeOptions,
  KunGalgameResourceLanguageOptions,
  KunGalgameResourcePlatformOptions
} from '~/constants/galgame'
import type { GalgamePageRequestData, GalgameCard } from '~/types/api/galgame'

const getGalgames = async (
  page: number,
  limit: number,
  type: KunGalgameResourceTypeOptions,
  language: KunGalgameResourceLanguageOptions,
  platform: KunGalgameResourcePlatformOptions,
  sortField: 'time' | 'created' | 'views',
  sortOrder: KunOrder,
  nsfw: string
) => {
  const skip = (page - 1) * limit

  const queryData = {
    status: { $ne: 1 },
    ...(nsfw === 'sfw' ? { content_limit: 'sfw' } : {}),
    ...(type !== 'all' ? { type: { $elemMatch: { $eq: type } } } : {}),
    ...(language !== 'all'
      ? { language: { $elemMatch: { $eq: language } } }
      : {}),
    ...(platform !== 'all'
      ? { platform: { $elemMatch: { $eq: platform } } }
      : {})
  }

  const totalCount = await GalgameModel.countDocuments(queryData)
  const data = await GalgameModel.find(queryData)
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const galgames: GalgameCard[] = data.map((galgame) => ({
    gid: galgame.gid,
    name: galgame.name,
    banner: galgame.banner,
    user: {
      uid: galgame.user[0].uid,
      name: galgame.user[0].name,
      avatar: galgame.user[0].avatar
    },
    contentLimit: galgame.content_limit,
    views: galgame.views,
    likes: galgame.likes.length,
    favorites: galgame.favorites.length,
    time: galgame.time,
    platform: galgame.platform,
    language: galgame.language
  }))

  return { galgames, totalCount }
}

export default defineEventHandler(async (event) => {
  const {
    page,
    limit,
    type,
    language,
    platform,
    sortField,
    sortOrder
  }: GalgamePageRequestData = await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder) {
    return kunError(event, 10507)
  }
  if (limit !== '24') {
    return kunError(event, 10209)
  }

  const nsfw = getNSFWCookie(event)

  const galgames = await getGalgames(
    parseInt(page),
    parseInt(limit),
    type,
    language,
    platform,
    sortField as 'time' | 'created' | 'views',
    sortOrder as KunOrder,
    nsfw
  )

  return galgames
})
