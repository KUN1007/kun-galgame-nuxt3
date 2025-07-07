import prisma from '~/prisma/prisma'
import { updateGalgamePrDeclineSchema } from '~/validations/galgame'

export default defineEventHandler(async (event) => {
  const input = await kunParsePostBody(event, updateGalgamePrDeclineSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const { galgamePrId, note } = input

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }
  const uid = userInfo.uid

  return await prisma.$transaction(async (prisma) => {
    const galgamePR = await prisma.galgame_pr.update({
      where: { id: galgamePrId },
      data: {
        status: 2,
        note,
        galgame: {}
      }
    })
    if (galgamePR.status !== 0) {
      return kunError(event, '该更新请求已经被处理')
    }

    await createGalgameHistory(prisma, {
      galgame_id: galgamePR.galgame_id,
      user_id: galgamePR.user_id,
      action: 'declined',
      type: 'pr',
      content: `#${galgamePR.index} ${note}`
    })

    if (uid !== galgamePR.user_id) {
      await createMessage(
        prisma,
        uid,
        galgamePR.user_id,
        'declined',
        `#${galgamePR.index} ${note}`,
        0,
        galgamePR.galgame_id
      )
    }

    return 'MOEMOE declined galgame pull request successfully!'
  })
})
