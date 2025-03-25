import UserModel from '@/server/models/user'
import GalgameModel from '@/server/models/galgame'
import { getPreferredLanguageText } from '~/utils/getPreferredLanguageText'
import type { GalgameRSS } from '@/types/api/rss'

export default defineEventHandler(async (event) => {
  const { language }: { language: Language } = await getQuery(event)
  if (!language) {
    return kunError(event, 10507)
  }

  const data = await GalgameModel.find()
    .sort({ created: 'desc' })
    .limit(10)
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const galgames: GalgameRSS[] = data.map((galgame) => ({
    gid: galgame.gid,
    name: getPreferredLanguageText(galgame.name, language),
    banner: galgame.banner,
    user: {
      uid: galgame.user[0].uid,
      name: galgame.user[0].name,
      avatar: galgame.user[0].avatar
    },
    time: galgame.time,
    description: getPreferredLanguageText(galgame.introduction, language).slice(
      0,
      233
    )
  }))

  return galgames
})
