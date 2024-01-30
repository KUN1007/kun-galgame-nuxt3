import env from '~/server/env/dotenv'
import { resizeUserAvatar } from '~/server/utils/uploadAvatarImage'

export default defineEventHandler(async (event) => {
  const avatarFile = await readMultipartFormData(event)
  if (!avatarFile || !Array.isArray(avatarFile)) {
    return 10110
  }

  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  const newFileName = `${userInfo.name}-${userInfo.uid}-kun-galgame-avatar`

  const res = await resizeUserAvatar(
    newFileName,
    avatarFile[0].data,
    userInfo.uid
  )

  if (res) {
    const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_ENDPOINT}/avatar/user_${userInfo.uid}/${newFileName}`
    return imageLink
  } else {
    kunError(event, 10116)
    return
  }
})
