import sharp from 'sharp'
import env from '@/server/env/dotenv'
import UserModel from '@/server/models/user'
import { uploadImage } from '@/server/utils/uploadImage'
import { checkBufferSize } from '@/server/utils/checkBufferSize'

const compressImage = async (name: string, image: Buffer, uid: number) => {
  const miniImage = await sharp(image)
    .resize(1920, 1080, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: 77 })
    .toBuffer()

  if (!checkBufferSize(miniImage, 1.007)) {
    return 10215
  }

  const bucketName = `image/topic/user_${uid}`
  const res1 = await uploadImage(miniImage, `${name}.webp`, bucketName)
  return !!res1
}

export default defineEventHandler(async (event) => {
  const imageFile = await readMultipartFormData(event)
  if (!imageFile || !Array.isArray(imageFile)) {
    return kunError(event, 10216)
  }
  if (!checkBufferSize(imageFile[0].data, 10)) {
    return kunError(event, 10214)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const user = await UserModel.findOne({ uid: userInfo.uid })
  if (!user) {
    return kunError(event, 10101)
  }
  if (user.daily_image_count >= 50) {
    return kunError(event, 10217)
  }

  const newFileName = `${userInfo.name}-${Date.now()}`

  const res = await compressImage(newFileName, imageFile[0].data, userInfo.uid)
  if (!res) {
    return kunError(event, 10116)
  }
  if (typeof res === 'number') {
    return kunError(event, res)
  }

  await UserModel.updateOne(
    { uid: userInfo.uid },
    { $inc: { daily_image_count: 1 } }
  )

  const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_URL}/topic/user_${userInfo.uid}/${newFileName}.webp`
  return imageLink
})
