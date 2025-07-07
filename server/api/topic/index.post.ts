import { subDays } from 'date-fns'
import prisma from '~/prisma/prisma'
import { createTopicSchema } from '~/validations/topic'

export default defineEventHandler(async (event) => {
  const input = await kunParsePutBody(event, createTopicSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const user = await prisma.user.findUnique({
    where: { id: userInfo.uid },
    include: {
      topic: {
        where: {
          created: {
            gte: subDays(new Date(), 1)
          }
        }
      }
    }
  })
  if (!user) {
    return kunError(event, '未找到该用户')
  }
  if (user.moemoepoint / 10 + 1 < user.topic.length) {
    return kunError(
      event,
      '您今日发布的话题已经达到上限, 您每天可以发布您的 (萌萌点 / 10) + 1 个话题'
    )
  }

  const { section, ...topicData } = input

  return await prisma.$transaction(async (prisma) => {
    const newTopic = await prisma.topic.create({
      data: {
        ...topicData,
        user_id: userInfo.uid
      }
    })

    const sections = await prisma.topic_section.findMany({
      where: { name: { in: section } },
      select: {
        id: true
      }
    })
    const newSectionIds = sections.map((s) => s.id)
    const dataToCreate = newSectionIds.map((sectionId) => ({
      topic_id: newTopic.id,
      topic_section_id: sectionId
    }))
    await prisma.topic_section_relation.createMany({
      data: dataToCreate,
      skipDuplicates: true
    })

    await prisma.user.update({
      where: { id: userInfo.uid },
      data: { moemoepoint: { increment: 3 } }
    })

    return newTopic.id
  })
})
