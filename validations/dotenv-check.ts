import { z } from 'zod'
import { config } from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

const envPath = path.resolve(__dirname, '..', '.env')
if (!fs.existsSync(envPath)) {
  console.error('.env file not found in the project root.')
  process.exit(1)
}

config({ path: envPath })

export const envSchema = z.object({
  KUN_GALGAME_URL: z.string().url(),
  KUN_GALGAME_API: z.string().url(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  JWT_ISS: z.string(),
  JWT_AUD: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  KUN_DATABASE_URL: z.string(),
  KUN_VISUAL_NOVEL_EMAIL_FROM: z.string(),
  KUN_VISUAL_NOVEL_EMAIL_HOST: z.string(),
  KUN_VISUAL_NOVEL_EMAIL_PORT: z.string(),
  KUN_VISUAL_NOVEL_EMAIL_ACCOUNT: z.string(),
  KUN_VISUAL_NOVEL_EMAIL_PASSWORD: z.string(),

  KUN_VISUAL_NOVEL_IMAGE_BED_ACCESS_KEY: z.string(),
  KUN_VISUAL_NOVEL_IMAGE_BED_SECRET_KEY: z.string(),
  KUN_VISUAL_NOVEL_IMAGE_BED_ENDPOINT: z.string(),
  KUN_VISUAL_NOVEL_IMAGE_BED_URL: z.string(),
  KUN_VISUAL_NOVEL_IMAGE_BED_BUCKET: z.string(),

  KUN_VISUAL_NOVEL_FORUM_UMAMI_ID: z.string(),

  KUN_CF_CACHE_ZONE_ID: z.string(),
  KUN_CF_CACHE_PURGE_API_TOKEN: z.string(),

  KUN_VISUAL_NOVEL_S3_STORAGE_ACCESS_KEY_ID: z.string(),
  KUN_VISUAL_NOVEL_S3_STORAGE_SECRET_ACCESS_KEY: z.string(),
  KUN_VISUAL_NOVEL_S3_STORAGE_BUCKET_NAME: z.string(),
  KUN_VISUAL_NOVEL_S3_STORAGE_ENDPOINT: z.string(),
  KUN_VISUAL_NOVEL_S3_STORAGE_REGION: z.string(),
  KUN_VISUAL_NOVEL_S3_STORAGE_URL: z.string()
})

export const env = envSchema.safeParse(process.env)

if (!env.success) {
  throw new Error(
    '❌ Invalid environment variables: ' +
      JSON.stringify(env.error.format(), null, 4)
  )
}
