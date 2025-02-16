import loliData from '~/public/ren.json'
import { randomNum } from '~/utils/random'

export const getLoli = async () => {
  const getAssetsFile = (name: number) => `/ren/${name}.webp`

  const randomBrow = randomNum(1, 18)
  const randomEye = randomNum(19, 36)
  const randomMouth = randomNum(37, 56)
  const randomFace = randomNum(57, 62)
  const randomSkirt = randomNum(63, 70)

  const loli = {
    lass: loliData[randomSkirt],
    eye: loliData[randomEye],
    brow: loliData[randomBrow],
    mouth: loliData[randomMouth],
    face: loliData[randomFace]
  }

  const loliBodyLeft = `${loli.lass.left}px`
  const loliBodyTop = `${loli.lass.top}px`

  const loliEyeLeft = `${loli.eye.left}px`
  const loliEyeTop = `${loli.eye.top}px`

  const loliBrowLeft = `${loli.brow.left}px`
  const loliBrowTop = `${loli.brow.top}px`

  const loliMouthLeft = `${loli.mouth.left}px`
  const loliMouthTop = `${loli.mouth.top}px`

  const loliFaceLeft = `${loli.face.left}px`
  const loliFaceTop = `${loli.face.top}px`

  const promises = [
    getAssetsFile(loli.lass.layer_id),
    getAssetsFile(loli.eye.layer_id),
    getAssetsFile(loli.brow.layer_id),
    getAssetsFile(loli.mouth.layer_id),
    getAssetsFile(loli.face.layer_id)
  ].map((url) => fetch(url))

  const responses = await Promise.all(promises)
  const results = await Promise.all(
    responses.map((response) => response.blob())
  )

  const [body, eye, brow, mouth, face] = results.map((blob) =>
    URL.createObjectURL(blob)
  )

  return {
    loliBodyLeft,
    loliBodyTop,
    loliEyeLeft,
    loliEyeTop,
    loliBrowLeft,
    loliBrowTop,
    loliMouthLeft,
    loliMouthTop,
    loliFaceLeft,
    loliFaceTop,

    body,
    eye,
    brow,
    mouth,
    face
  }
}
