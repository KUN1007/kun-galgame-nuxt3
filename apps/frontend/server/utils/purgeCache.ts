import env from '../env/dotenv'

export const purgeCache = async (
  type: 'galgameBanner' | 'userAvatar',
  id: number
) => {
  const imageBedUrl = env.KUN_VISUAL_NOVEL_IMAGE_BED_URL

  const galgameBannerUrl = `${imageBedUrl}/galgame/${id}/banner/banner.webp`
  const galgameBannerMiniUrl = `${imageBedUrl}/galgame/${id}/banner/banner-mini.webp`

  const userAvatarUrl = `${imageBedUrl}/avatar/user_${id}/avatar.webp`
  const userAvatarMiniUrl = `${imageBedUrl}/avatar/user_${id}/avatar-100.webp`

  const filesArray =
    type === 'galgameBanner'
      ? [galgameBannerUrl, galgameBannerMiniUrl]
      : [userAvatarUrl, userAvatarMiniUrl]

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${env.KUN_CF_CACHE_ZONE_ID}/purge_cache`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.KUN_CF_CACHE_PURGE_API_TOKEN}`
      },
      body: JSON.stringify({ files: filesArray })
    }
  )

  return { status: res.status }
}
