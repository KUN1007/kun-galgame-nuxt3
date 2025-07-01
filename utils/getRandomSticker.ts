export const getRandomSticker = (id: string) => {
  const key = `random-sticker-${id}`

  const stickerUrl = useState<string>(key, () => {
    const randomPackIndex = randomNum(1, 5)
    const randomStickerIndex = randomNum(1, 80)
    return `${kungal.domain.sticker}/stickers/KUNgal${randomPackIndex}/${randomStickerIndex}.webp`
  })

  return stickerUrl
}
