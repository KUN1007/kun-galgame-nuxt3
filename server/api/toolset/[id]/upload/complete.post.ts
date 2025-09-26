import prisma from '~/prisma/prisma'
import { s3 } from '~/lib/s3/client'
import {
  CompleteMultipartUploadCommand,
  HeadObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'
import { USER_DAILY_UPLOAD_LIMIT as MAX_DAILY_BYTES } from '~/config/upload'
import { completeToolsetUploadSchema } from '~/validations/toolset'
import {
  getUploadCache,
  removeUploadCache
} from '~/server/utils/upload/saveUploadSalt'
import type { ToolsetUploadCompleteResponse } from '~/types/api/toolset'

export default defineEventHandler(async (event) => {
  const input = await kunParsePostBody(event, completeToolsetUploadSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { salt, uploadId, parts } = input

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const fileCache = await getUploadCache(salt)
  if (!fileCache) {
    return kunError(event, '上传文件缓存信息获取失败')
  }

  if (uploadId) {
    if (!parts || !parts.length) {
      return kunError(event, '分片信息缺失')
    }
    const sorted = parts
      .slice()
      .sort((a, b) => a.PartNumber - b.PartNumber)
      .map((p) => ({ PartNumber: p.PartNumber, ETag: p.ETag }))
    await s3.send(
      new CompleteMultipartUploadCommand({
        Bucket: process.env.KUN_VISUAL_NOVEL_S3_STORAGE_BUCKET_NAME!,
        Key: fileCache.key,
        UploadId: uploadId,
        MultipartUpload: { Parts: sorted }
      })
    )
  }

  const head = await s3.send(
    new HeadObjectCommand({
      Bucket: process.env.KUN_VISUAL_NOVEL_S3_STORAGE_BUCKET_NAME!,
      Key: fileCache.key
    })
  )
  /* a response head example
{ '$metadata':
   { httpStatusCode: 200,
     requestId: '',
     extendedRequestId: '',
     cfId: undefined,
     attempts: 1,
     totalRetryDelay: 0 },
  AcceptRanges: 'bytes',
  LastModified: 2025-09-26T18:11:39.000Z,
  ContentLength: 15521549,
  ETag: '"dca682778c0765206314a525e3bb902c"',
  VersionId: '',
  ContentType: 'application/octet-stream',
  Metadata: {} 
}
   */

  const actualBytes = Number(head.ContentLength || 0)
  if (!actualBytes || actualBytes !== fileCache.filesize) {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.KUN_VISUAL_NOVEL_S3_STORAGE_BUCKET_NAME!,
        Key: fileCache.key
      })
    )
    await removeUploadCache(salt)
    return kunError(event, '文件大小校验失败，请重试或联系管理员')
  }

  const user = await prisma.user.findUnique({
    where: { id: userInfo.uid },
    select: { role: true, daily_toolset_upload_count: true }
  })
  if (!user) {
    return kunError(event, '用户不存在', 205)
  }
  if (user.role <= 1) {
    const used = user.daily_toolset_upload_count || 0
    if (used + actualBytes > MAX_DAILY_BYTES) {
      return kunError(event, '超出当日可用上传额度，请明天再试')
    }
    await prisma.user.update({
      where: { id: userInfo.uid },
      data: { daily_toolset_upload_count: used + actualBytes }
    })
  }

  return {
    salt,
    key: fileCache.key,
    filesize: fileCache.filesize
  } satisfies ToolsetUploadCompleteResponse
})
