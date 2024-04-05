import sharp from 'sharp'

export const uploadGalgameBanner = async (banner: Buffer, gid: number) => {
  const miniBanner = await sharp(banner)
    .resize(460, 259, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer()

  if (!checkBufferSize(miniBanner, 1.007)) {
    return 10608
  }

  const bucketName = `image/galgame/${gid}/banner`

  const res1 = await uploadImage(banner, 'banner.webp', bucketName)
  const res2 = await uploadImage(miniBanner, 'banner-mini', bucketName)

  return !!(res1 && res2)
}
