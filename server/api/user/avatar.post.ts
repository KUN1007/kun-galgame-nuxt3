import AWS from 'aws-sdk'
import env from '~/server/env/dotenv'

const uploadAvatarImage = async (file: Buffer, fileName: string) => {
  const s3 = new AWS.S3({
    endpoint: env.KUN_VISUAL_NOVEL_IMAGE_BED_ENDPOINT,
    accessKeyId: env.KUN_VISUAL_NOVEL_IMAGE_BED_ACCESS_KEY,
    secretAccessKey: env.KUN_VISUAL_NOVEL_IMAGE_BED_SECRET_KEY,
    s3BucketEndpoint: true,
  })

  const res = await s3
    .putObject({
      Body: file,
      Bucket: 'avatar',
      Key: fileName,
    })
    .promise()

  return res
}

export default defineEventHandler(async (event) => {
  const avatarFile = await readMultipartFormData(event)
  if (!avatarFile || !Array.isArray(avatarFile)) {
    return 10110
  }

  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  const newFileName = `${userInfo.name}-${userInfo.uid}-kun-galgame-avatar`

  const res = await uploadAvatarImage(avatarFile[0].data, newFileName)
})
