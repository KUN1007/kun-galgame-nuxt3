import prisma from '~/prisma/prisma'
import { deleteToolsetDetailSchema } from '~/validations/toolset'

export default defineEventHandler(async (event) => {
  const input = kunParseDeleteQuery(event, deleteToolsetDetailSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const toolset = await prisma.galgame_toolset.findUnique({
    where: { id: input.toolsetId },
    select: { user_id: true }
  })
  if (!toolset) {
    return kunError(event, '工具不存在或已删除')
  }

  if (toolset.user_id !== userInfo.uid && userInfo.role < 2) {
    return kunError(event, '您无权限删除该工具')
  }

  await prisma.galgame_toolset.delete({ where: { id: input.toolsetId } })

  return 'MOEMOE delete toolset successfully!'
})
