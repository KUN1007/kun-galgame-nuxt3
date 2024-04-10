import GalgameResourceModel from '~/server/models/galgame-resource'
import { checkGalgameResourcePublish } from '../../utils/checkGalgameResourcePublish'
import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

export default defineEventHandler(async (event) => {
  const result: GalgameResourceStoreTemp = await readBody(event)
  if (!result) {
    kunError(event, 10507)
    return
  }
  const res = checkGalgameResourcePublish(result)
  if (res) {
    kunError(event, res)
    return
  }
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    kunError(event, 10507)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  await GalgameResourceModel.updateOne({ grid, uid }, { ...result })

  return 'MOEMOE update galgame resource operation successfully!'
})
