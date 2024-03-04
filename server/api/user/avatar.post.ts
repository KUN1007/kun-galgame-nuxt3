import UserModel from '~/server/models/user'
import env from '~/server/env/dotenv'
import sharp from 'sharp'
import { uploadImage } from '~/server/utils/uploadImage'
import { checkBufferSize } from '~/server/utils/checkBufferSize'

const resizeUserAvatar = async (name: string, avatar: Buffer, uid: number) => {
  const miniAvatar = await sharp(avatar)
    .resize(100, 100, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer()

  if (!checkBufferSize(miniAvatar, 1.007)) {
    return 10111
  }

  const miniAvatarName = `${name}-100`
  const bucketName = `image/avatar/user_${uid}`

  const res1 = await uploadImage(avatar, `${name}.webp`, bucketName)
  const res2 = await uploadImage(
    miniAvatar,
    `${miniAvatarName}.webp`,
    bucketName
  )

  return !!(res1 && res2)
}

export default defineEventHandler(async (event) => {
  const avatarFile = await readMultipartFormData(event)
  if (!avatarFile || !Array.isArray(avatarFile)) {
    kunError(event, 10110)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  const res = await resizeUserAvatar('avatar', avatarFile[0].data, userInfo.uid)
  if (!res) {
    kunError(event, 10116)
    return
  }
  if (typeof res === 'number') {
    kunError(event, res)
    return
  }

  const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_URL}/avatar/user_${userInfo.uid}/avatar.webp`
  await UserModel.updateOne(
    { uid: userInfo.uid },
    { $set: { avatar: imageLink } }
  )

  return imageLink
})
