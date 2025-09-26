import sharp from 'sharp'
import { uploadImageToS3 } from '~/lib/s3/uploadImageToS3'
import {
  KUN_VISUAL_NOVEL_IMAGE_COMPRESS_QUALITY,
  KUN_VISUAL_NOVEL_IMAGE_COMPRESS_LIMIT
} from '~/config/upload'

export const uploadGalgameBanner = async (
  bannerBuffer: Buffer,
  galgameId: number
) => {
  const banner = await sharp(bannerBuffer).toBuffer()
  const miniBanner = await sharp(bannerBuffer)
    .resize(460, 259, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: KUN_VISUAL_NOVEL_IMAGE_COMPRESS_QUALITY })
    .toBuffer()

  if (!checkBufferSize(banner, KUN_VISUAL_NOVEL_IMAGE_COMPRESS_LIMIT)) {
    return `图片压缩后大小超过 ${KUN_VISUAL_NOVEL_IMAGE_COMPRESS_LIMIT} MB`
  }

  const bucketName = `galgame/${galgameId}/banner`

  await uploadImageToS3(`${bucketName}/banner.webp`, banner)
  await uploadImageToS3(`${bucketName}/banner-mini.webp`, miniBanner)
}
