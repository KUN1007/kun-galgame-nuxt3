import prisma from '~/prisma/prisma'
import { createToolsetResourceSchema } from '~/validations/toolset'
import {
  getUploadCache,
  removeUploadCache
} from '~/server/utils/upload/saveUploadSalt'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const input = await kunParsePostBody(event, createToolsetResourceSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { toolsetId, content, code, password, size, note, salt } = input

  const fileCache = await getUploadCache(salt)
  if (!fileCache) {
    return kunError(event, '上传文件缓存信息获取失败')
  }

  const toolset = await prisma.galgame_toolset.findUnique({
    where: { id: toolsetId },
    select: { id: true }
  })
  if (!toolset) {
    return kunError(event, '该工具集不存在')
  }

  await prisma.$transaction(async (p) => {
    await p.galgame_toolset_resource.create({
      data: {
        content: salt ? fileCache.key : content,
        type: salt ? 's3' : 'user',
        code,
        password,
        size: salt ? fileCache.filesize.toString() : size,
        note,
        toolset_id: toolsetId,
        user_id: userInfo.uid
      }
    })

    await p.galgame_toolset_contributor.createMany({
      data: [{ toolset_id: toolsetId, user_id: userInfo.uid }],
      skipDuplicates: true
    })
  })

  await removeUploadCache(salt)

  return 'Moemoe create toolset resource successfully!'
})
