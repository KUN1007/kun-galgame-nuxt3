import fs from 'fs'
import path from 'path'
import env from '@/config/config.dev'
// 处理图片的库
import sharp from 'sharp'

import { Context } from 'koa'

// 清空用户的头像文件夹
const clearUserFolder = (userFolderPath: string) => {
  if (fs.existsSync(userFolderPath)) {
    fs.readdirSync(userFolderPath).forEach((file) => {
      const filePath = path.join(userFolderPath, file)
      // 如果是文件，直接删除
      fs.unlink(filePath, () => {})
    })
  }
}

// 将用户的头像变更大小
export const resizedUserAvatar = async (ctx: Context, uid: number) => {
  // 获取头像图片
  const avatarFile = ctx.request.files.avatar

  if (Array.isArray(avatarFile)) {
    return 10110
  }

  if (avatarFile.size > 50 * 1024) {
    return 10111
  }

  // 为文件生成新的唯一文件名，例如使用时间戳
  const newFileName = `${
    avatarFile.originalFilename
  }-${Date.now()}-kun-galgame-avatar`

  // 构建新的文件路径
  const newPath = path.resolve(
    __dirname,
    '..',
    '..',
    env.AVATAR_PATH,
    `user_${uid}`
  )

  // 清空用户文件夹
  clearUserFolder(newPath)

  if (!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath, { recursive: true })
  }

  const originalFilePath = path.join(newPath, `${newFileName}.webp`)
  const resizedFilePath = path.join(newPath, `${newFileName}-100.webp`)

  // 移动文件并重命名
  fs.renameSync(avatarFile.filepath, originalFilePath)

  // 使用Sharp库调整图像大小为 100x100 像素并保存
  await sharp(originalFilePath)
    // 背景透明
    .resize(100, 100, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(resizedFilePath)

  // example: http://127.0.0.1:10007/uploads/avatar/user_1/kun-1697384098167-kun-galgame-avatar.web

  // development link
  const imageLinkDev = `http://${env.APP_HOST}:${env.APP_PORT}/${env.AVATAR_PATH}/user_${uid}/${newFileName}.webp`
  // production link
  const urlArray = env.ALLOW_DOMAIN.match(/\[(.*?)\]/)[1].split(', ')

  const imageLinkProd = `${urlArray[0]}/${env.AVATAR_PATH}/user_${uid}/${newFileName}.webp`

  const imageLink =
    process.env.NODE_ENV === 'development' ? imageLinkDev : imageLinkProd

  return imageLink
}
