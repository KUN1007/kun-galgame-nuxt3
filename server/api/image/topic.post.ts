import { uploadImage } from '~/server/utils/uploadImage'
import sharp from 'sharp'
import env from '~/server/env/dotenv'
import { checkBufferSize } from '~/server/utils/checkBufferSize'

const compressImage = async (name: string, image: Buffer, uid: number) => {
  const miniImage = await sharp(image)
    .resize(1920, 1080, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 77 })
    .toBuffer()

  if (!checkBufferSize(miniImage, 1.007)) {
    return 10215
  }

  const bucketName = `image/topic/user_${uid}`
  const res1 = await uploadImage(miniImage, `${name}.webp`, bucketName)
  return res1 ? true : false
}

export default defineEventHandler(async (event) => {
  const imageFile = await readMultipartFormData(event)
  if (!imageFile || !Array.isArray(imageFile)) {
    kunError(event, 10216)
    return
  }
  if (!checkBufferSize(imageFile[0].data, 10)) {
    kunError(event, 10214)
    return
  }

  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  const newFileName = `${userInfo.name}-${Date.now()}`

  const res = await compressImage(newFileName, imageFile[0].data, userInfo.uid)
  if (!res) {
    kunError(event, 10116)
    return
  }
  if (typeof res === 'number') {
    kunError(event, res)
    return
  }

  const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_URL}/topic/user_${userInfo.uid}/${newFileName}.webp`
  return imageLink
})
