import GalgameModel from '~/server/models/galgame'
import UserModel from '~/server/models/user'
import mongoose from 'mongoose'
import type { GalgameContributor, GalgameDetail } from '~/types/api/galgame'

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10609)
  }
  const userInfo = await getCookieTokenInfo(event)

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const galgame = await GalgameModel.findOne({ gid }).lean()
    if (!galgame) {
      return kunError(event, 10610)
    }
    if (galgame.status === 1) {
      return 'banned'
    }

    await GalgameModel.updateOne({ gid }, { $inc: { views: 1 } })

    const publisher = await UserModel.findOne({ uid: galgame.uid })
    if (!publisher) {
      return kunError(event, 10101)
    }

    const contributorData = await UserModel.find(
      { uid: { $in: galgame.contributor } },
      'uid avatar'
    )
    const contributor: GalgameContributor[] = contributorData.map((user) => ({
      uid: user.uid,
      avatar: user.avatar
    }))

    const introductionHtml: KunLanguage = {} as KunLanguage
    for (const key of Object.keys(galgame.introduction) as Array<
      keyof KunLanguage
    >) {
      introductionHtml[key] = await markdownToHtml(galgame.introduction[key])
    }

    const data: GalgameDetail = {
      gid: galgame.gid,
      vndbId: galgame.vndb_id,
      user: {
        uid: publisher.uid,
        name: publisher.name,
        avatar: publisher.avatar
      },
      name: galgame.name,
      banner: galgame.banner,
      introduction: introductionHtml,
      markdown: galgame.introduction,
      time: galgame.time,
      views: galgame.views,
      platform: galgame.platform,
      language: galgame.language,
      contributor,
      likes: {
        count: galgame.likes.length,
        isLiked: galgame.likes.includes(userInfo?.uid ?? 0)
      },
      favorites: {
        count: galgame.favorites.length,
        isFavorite: galgame.favorites.includes(userInfo?.uid ?? 0)
      },
      alias: galgame.alias,
      official: galgame.official,
      engine: galgame.engine,
      tags: galgame.tags,
      series: galgame.series
    }

    await session.commitTransaction()

    return data
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
