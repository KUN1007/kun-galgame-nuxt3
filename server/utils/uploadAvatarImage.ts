import AWS from 'aws-sdk'
import sharp from 'sharp'
import env from '~/server/env/dotenv'

const uploadAvatarImage = async (
  file: Buffer,
  fileName: string,
  uid: number
) => {
  const s3 = new AWS.S3({
    endpoint: env.KUN_VISUAL_NOVEL_IMAGE_BED_ENDPOINT,
    accessKeyId: env.KUN_VISUAL_NOVEL_IMAGE_BED_ACCESS_KEY,
    secretAccessKey: env.KUN_VISUAL_NOVEL_IMAGE_BED_SECRET_KEY,
    s3BucketEndpoint: true,
  })

  const res = await s3
    .putObject({
      Body: file,
      Bucket: `image/avatar/user_${uid}`,
      Key: fileName,
    })
    .promise()

  return res
}

export const resizeUserAvatar = async (
  name: string,
  avatar: Buffer,
  uid: number
) => {
  const miniAvatar = await sharp(avatar)
    .resize(100, 100, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer()

  const miniAvatarName = `${name}-100`

  const res1 = await uploadAvatarImage(avatar, `${name}.webp`, uid)
  const res2 = await uploadAvatarImage(
    miniAvatar,
    `${miniAvatarName}.webp`,
    uid
  )

  return res1.ETag && res2.ETag
}
