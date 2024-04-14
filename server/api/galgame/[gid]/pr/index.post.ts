import GalgamePRModel from '~/server/models/galgame-pr'
import { checkGalgamePR } from '../../utils/checkGalgamePR'
import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

export default defineEventHandler(async (event) => {
  const galgame: GalgameStoreTemp = await readBody(event)
  const res = checkGalgamePR(galgame)
  if (res) {
    return kunError(event, res)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  await GalgamePRModel.create({ gid: galgame.gid, uid: userInfo.uid, galgame })

  return 'MOEMOE commit galgame pull request successfully!'
})
