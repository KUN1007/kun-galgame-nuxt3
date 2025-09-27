import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3ClientR2 } from './client'

export const uploadImageToS3 = async (key: string, fileBuffer: Buffer) => {
  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.KUN_VISUAL_NOVEL_IMAGE_BED_BUCKET!,
    Key: key,
    Body: fileBuffer,
    ContentType: 'application/octet-stream'
  })
  await s3ClientR2.send(uploadCommand)
}
