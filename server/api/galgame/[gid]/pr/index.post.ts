import GalgameModel from '~/server/models/galgame'
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

  const originalGalgame = await GalgameModel.findOne({
    gid: galgame.gid
  }).lean()
  if (!originalGalgame) {
    return kunError(event, 10610)
  }
  const { gid, name, introduction, alias, official } = originalGalgame

  const diffGalgame = compareObjects(galgame, {
    gid,
    name,
    introduction,
    alias,
    official
  })

  await GalgamePRModel.create({
    gid: galgame.gid,
    uid: userInfo.uid,
    galgame: diffGalgame
  })

  return 'MOEMOE commit galgame pull request successfully!'
})
