import UserModel from '~/server/models/user'
import env from '~/server/env/dotenv'
import { resizeUserAvatar } from '~/server/utils/uploadAvatarImage'

export default defineEventHandler(async (event) => {
  const avatarFile = await readMultipartFormData(event)
  if (!avatarFile || !Array.isArray(avatarFile)) {
    kunError(event, 10110)
    return
  }

  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  const newFileName = `${userInfo.name}-${Date.now()}-kun-galgame-avatar`

  const res = await resizeUserAvatar(
    newFileName,
    avatarFile[0].data,
    userInfo.uid
  )
  if (!res) {
    kunError(event, 10116)
    return
  }

  const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_URL}/avatar/user_${userInfo.uid}/${newFileName}.webp`
  await UserModel.updateOne(
    { uid: userInfo.uid },
    { $set: { avatar: imageLink } }
  )

  return imageLink
})
