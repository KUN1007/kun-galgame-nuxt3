import GalgameResourceModel from '~/server/models/galgame-resource'
import { checkGalgameResourcePublish } from '../../utils/checkGalgameResourcePublish'
import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

export default defineEventHandler(async (event) => {
  const result: GalgameResourceStoreTemp = await readBody(event)
  if (!result) {
    return kunError(event, 10507)
  }
  const res = checkGalgameResourcePublish(result)
  if (res) {
    return kunError(event, res)
  }
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    return kunError(event, 10507)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  await GalgameResourceModel.updateOne({ grid, uid }, { ...result })

  return 'MOEMOE update galgame resource operation successfully!'
})
