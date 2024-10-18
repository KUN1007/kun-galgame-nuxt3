import sharp from 'sharp'

export const uploadGalgameBanner = async (
  bannerBuffer: ArrayBuffer,
  gid: number
) => {
  const banner = await sharp(bannerBuffer).toBuffer()
  const miniBanner = await sharp(bannerBuffer)
    .resize(460, 259, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .webp({ quality: 77 })
    .toBuffer()

  if (!checkBufferSize(miniBanner, 1.007)) {
    return 10605
  }

  const bucketName = `image/galgame/${gid}/banner`

  const res1 = await uploadImage(banner, 'banner.webp', bucketName)
  const res2 = await uploadImage(miniBanner, 'banner-mini.webp', bucketName)

  return !!(res1 && res2)
}
