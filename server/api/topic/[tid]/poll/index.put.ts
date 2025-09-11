import prisma from '~/prisma/prisma'
import { updatePollSchema } from '~/validations/topic-poll'
import type { z } from 'zod'
import type { KUNGalgamePayload } from '~/types/utils/jwt'

const updatePoll = async (
  input: z.infer<typeof updatePollSchema>,
  userInfo: KUNGalgamePayload
) => {
  const poll = await prisma.topic_poll.findUnique({
    where: { id: input.poll_id },
    include: {
      topic: true,
      option: {
        include: { _count: { select: { vote: true } } }
      }
    }
  })

  if (!poll) {
    return '投票不存在'
  }
  if (poll.topic.user_id !== userInfo.uid && userInfo.role <= 2) {
    return '您没有权限修改此投票'
  }

  const { options, ...rest } = input
  if (!options) {
    await prisma.topic_poll.update({
      where: { id: poll.id },
      data: rest
    })
    return '投票信息更新成功！'
  }

  const existingOptionsMap = new Map(poll.option.map((opt) => [opt.id, opt]))

  if (options.update && options.update.length > 0) {
    for (const { option_id } of options.update) {
      const option = existingOptionsMap.get(option_id)
      if (!option) {
        return `要更新的选项 ID ${option_id} 不存在`
      }
      if (option._count.vote > 0) {
        return `选项 ${option.text} 已有投票，无法编辑`
      }
    }
  }

  if (options.delete && options.delete.length > 0) {
    for (const optionId of options.delete) {
      const option = existingOptionsMap.get(optionId)
      if (!option) {
        return `要删除的选项 ID ${optionId} 不存在`
      }
      if (option._count.vote > 0) {
        return `选项 ${option.text} 已有投票，无法删除`
      }
    }
  }

  await prisma.$transaction(async (prisma) => {
    await prisma.topic_poll.update({
      where: { id: poll.id },
      data: rest
    })

    if (options.add && options.add.length > 0) {
      await prisma.topic_poll_option.createMany({
        data: options.add.map((opt) => ({
          text: opt.text,
          poll_id: input.poll_id
        }))
      })
    }

    if (options.update && options.update.length > 0) {
      const updatePromises = options.update.map(({ option_id, text }) =>
        prisma.topic_poll_option.update({
          where: { id: option_id },
          data: { text }
        })
      )
      await Promise.all(updatePromises)
    }

    if (options.delete && options.delete.length > 0) {
      await prisma.topic_poll_option.deleteMany({
        where: { id: { in: options.delete } }
      })
    }
  })
}

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效')
  }

  const input = await kunParsePutBody(event, updatePollSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const res = await updatePoll(input, userInfo)
  if (typeof res === 'string') {
    return kunError(event, res)
  }

  return 'Moemoe update poll successfully!'
})
