import prisma from '~/prisma/prisma'
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
    .webp({ quality: 77 })
    .toBuffer()

  if (!checkBufferSize(miniAvatar, 1.007)) {
    return '图片压缩后大小超过 1 MB'
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
    return kunError(event, '读取图片错误')
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const res = await resizeUserAvatar('avatar', avatarFile[0].data, userInfo.uid)
  if (!res) {
    return kunError(event, '上传图片错误')
  }
  if (typeof res === 'string') {
    return kunError(event, res)
  }

  const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_URL}/avatar/user_${userInfo.uid}/avatar.webp`
  await prisma.user.update({
    where: { id: userInfo.uid },
    data: { avatar: imageLink }
  })

  await purgeCache('userAvatar', userInfo.uid)

  return imageLink
})
