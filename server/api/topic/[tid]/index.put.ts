import prisma from '~/prisma/prisma'
import { updateTopicSchema } from '~/validations/topic'

export default defineEventHandler(async (event) => {
  const input = await kunParsePutBody(event, updateTopicSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const { topicId, section, ...topicData } = input

  return await prisma.$transaction(async (prisma) => {
    await prisma.topic.update({
      where: { id: topicId, user_id: userInfo.uid },
      data: {
        ...topicData,
        edited: new Date()
      }
    })

    const sections = await prisma.topic_section.findMany({
      where: { name: { in: section } },
      select: {
        id: true
      }
    })
    const newSectionIds = sections.map((s) => s.id)

    await prisma.topic_section_relation.deleteMany({
      where: {
        topic_id: topicId,
        topic_section_id: {
          notIn: newSectionIds
        }
      }
    })

    const dataToCreate = newSectionIds.map((sectionId) => ({
      topic_id: topicId,
      topic_section_id: sectionId
    }))

    await prisma.topic_section_relation.createMany({
      data: dataToCreate,
      skipDuplicates: true
    })

    return 'MOEMOE update topic successfully!'
  })
})
