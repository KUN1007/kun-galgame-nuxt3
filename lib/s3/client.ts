import { S3Client } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
  endpoint: process.env.KUN_VISUAL_NOVEL_S3_STORAGE_ENDPOINT!,
  region: process.env.KUN_VISUAL_NOVEL_S3_STORAGE_REGION!,
  credentials: {
    accessKeyId: process.env.KUN_VISUAL_NOVEL_S3_STORAGE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.KUN_VISUAL_NOVEL_S3_STORAGE_SECRET_ACCESS_KEY!
  },
  requestChecksumCalculation: 'WHEN_REQUIRED'
})
