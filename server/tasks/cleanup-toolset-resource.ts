import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '~/lib/s3/client'
import {
  removeUploadCache,
  type UploadSaltCache
} from '~/server/utils/upload/saveUploadSalt'

export default defineTask({
  meta: {
    name: 'cleanup-toolset-resource',
    description:
      'Every hour, delete S3 objects referenced by toolset:resource keys in Redis.'
  },

  async run() {
    const storage = useStorage('redis')
    const keys = await storage.getKeys('toolset:resource')

    let deletedCount = 0

    for (const key of keys) {
      const store = await storage.getItem(key)
      const parsedResult = JSON.parse(JSON.stringify(store)) as UploadSaltCache

      try {
        if (parsedResult && parsedResult.key) {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.KUN_VISUAL_NOVEL_S3_STORAGE_BUCKET_NAME!,
              Key: parsedResult.key
            })
          )
          await removeUploadCache(parsedResult.salt)

          deletedCount++
        }
      } catch (err) {
        console.error(`Failed to delete object for key ${key}:`)
      }
    }

    return { result: `Deleted ${deletedCount} toolset resources from S3.` }
  }
})
