import AWS from 'aws-sdk'
import env from '~/server/env/dotenv'

export const uploadImage = async (
  file: Buffer,
  fileName: string,
  bucket: string
) => {
  const s3 = new AWS.S3({
    endpoint: env.KUN_VISUAL_NOVEL_IMAGE_BED_ENDPOINT,
    accessKeyId: env.KUN_VISUAL_NOVEL_IMAGE_BED_ACCESS_KEY,
    secretAccessKey: env.KUN_VISUAL_NOVEL_IMAGE_BED_SECRET_KEY,
    s3BucketEndpoint: true
  })

  const res = await s3
    .putObject({
      Body: file,
      Bucket: bucket,
      Key: fileName
    })
    .promise()

  return res.ETag
}
