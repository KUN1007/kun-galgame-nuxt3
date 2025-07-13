import prisma from '~/prisma/prisma'

export const getKunDynamicRoutes = async () => {
  const topics = await prisma.topic.findMany({
    select: { id: true, updated: true }
  })

  const galgames = await prisma.galgame.findMany({
    select: { id: true, updated: true }
  })

  const topicRoutes = topics.map((topic) => ({
    path: `/topic/${topic.id}`,
    lastmod: topic.updated?.toISOString() || new Date().toISOString()
  }))

  const galgameRoutes = galgames.map((galgame) => ({
    path: `/galgame/${galgame.id}`,
    lastmod: galgame.updated?.toISOString() || new Date().toISOString()
  }))

  return [...topicRoutes, ...galgameRoutes]
}
