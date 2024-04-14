import GalgameModel from '~/server/models/galgame'
import GalgamePRModel from '~/server/models/galgame-pr'
import { checkGalgamePR } from '../../utils/checkGalgamePR'
import type { GalgameStoreTemp } from '~/store/types/edit/galgame'
import { compareObjects } from '~/server/utils/compare'

export default defineEventHandler(async (event) => {
  const galgamePR: GalgameStoreTemp = await readBody(event)
  const res = checkGalgamePR(galgamePR)
  if (res) {
    return kunError(event, res)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const data = await GalgameModel.findOne({ gid: galgamePR.gid })
  if (!data) {
    kunError(event, 10610)
    return
  }
  const galgame: GalgameStoreTemp = { ...data }

  const changes = compareObjects(galgame, galgamePR)

  await GalgamePRModel.create({ ...changes, uid: userInfo.uid })

  return 'MOEMOE commit galgame pull request successfully!'
})
