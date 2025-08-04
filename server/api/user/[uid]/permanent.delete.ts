import prisma from '~/prisma/prisma'
import { deleteUserSchema } from '~/validations/user'

export default defineEventHandler(async (event) => {
  const input = kunParseDeleteQuery(event, deleteUserSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效')
  }
  if (userInfo.role <= 2) {
    return kunError(event, '您没有权限删除用户')
  }

  const targetUser = await prisma.user.findUnique({
    where: {
      id: input.userId
    }
  })
  if (!targetUser) {
    return kunError(event, '用户不存在')
  }
  if (targetUser.role > 1) {
    return kunError(event, '不能删除一个管理员')
  }

  await prisma.user.delete({
    where: { id: input.userId }
  })

  return 'Moemoe delete user successfully!'
})
