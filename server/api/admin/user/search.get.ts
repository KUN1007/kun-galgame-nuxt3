import prisma from '~/prisma/prisma'
import { getAdminUserSearchSchema } from '~/validations/admin'
import type { AdminUser } from '~/types/api/admin'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getAdminUserSearchSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const data = await prisma.user.findMany({
    where: {
      name: { contains: input.q, mode: 'insensitive' }
    },
    take: 50
  })

  const users: AdminUser[] = data.map((user) => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    created: user.created
  }))

  return users
})
