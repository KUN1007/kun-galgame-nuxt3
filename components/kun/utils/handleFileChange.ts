const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

export const checkImageValid = (file: File) => {
  if (allowedTypes.includes(file.type)) {
    return true
  } else {
    useMessage(10111, 'warn')
    return false
  }
}

export const resizeImage = (
  file: File,
  width: number,
  height: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = () => {
      let newWidth = image.width
      let newHeight = image.height

      if (image.width > width || image.height > height) {
        const aspectRatio = image.width / image.height
        if (aspectRatio > 1) {
          newWidth = width
          newHeight = newWidth / aspectRatio
        } else {
          newHeight = height
          newWidth = newHeight * aspectRatio
        }
      }

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = newWidth
      canvas.height = newHeight

      ctx?.drawImage(image, 0, 0, newWidth, newHeight)
      const resizedFile = dataURItoBlob(canvas.toDataURL('image/webp', 0.77))

      if (resizedFile.size > 1.007 * 1024 * 1024) {
        useMessage(10112, 'warn')
        reject(new Error('Image is too large.'))
      } else {
        resolve(resizedFile)
      }
    }
  })
}
