import { s3 } from '~/lib/s3/client'
import { AbortMultipartUploadCommand } from '@aws-sdk/client-s3'
import { abortToolsetUploadSchema } from '~/validations/toolset'
import {
  getUploadCache,
  removeUploadCache
} from '~/server/utils/upload/saveUploadSalt'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const input = await kunParsePostBody(event, abortToolsetUploadSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const { salt, uploadId } = input

  const fileCache = await getUploadCache(salt)
  if (!fileCache) {
    return kunError(event, '上传文件缓存信息获取失败')
  }

  await s3.send(
    new AbortMultipartUploadCommand({
      Bucket: process.env.KUN_VISUAL_NOVEL_S3_STORAGE_BUCKET_NAME!,
      Key: fileCache.key,
      UploadId: uploadId
    })
  )

  await removeUploadCache(salt)

  return 'Moemoe abort upload successfully!'
})
