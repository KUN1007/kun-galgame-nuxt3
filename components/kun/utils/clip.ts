import type { CSSProperties } from 'vue'

const croppingBox = ref({
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  isDragging: false,
  resizeHandle: ''
})

const draggingStart = ref({ x: 0, y: 0 })
const aspectRatio = 1

export const croppingBoxStyle = computed<CSSProperties>(() => {
  return {
    top: `${croppingBox.value.y}px`,
    left: `${croppingBox.value.x}px`,
    width: `${croppingBox.value.width}px`,
    height: `${croppingBox.value.height}px`,
    position: 'absolute',
    border: '2px solid red',
    cursor: croppingBox.value.isDragging ? 'move' : 'default'
  }
})

export const handleMouseDown = (event: MouseEvent, handle: string = '') => {
  croppingBox.value.isDragging = true
  croppingBox.value.resizeHandle = handle
  draggingStart.value = { x: event.clientX, y: event.clientY }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (event: MouseEvent) => {
  if (!croppingBox.value.isDragging) {
    return
  }

  const deltaX = event.clientX - draggingStart.value.x
  const deltaY = event.clientY - draggingStart.value.y
  draggingStart.value = { x: event.clientX, y: event.clientY }

  if (croppingBox.value.resizeHandle) {
    resizeCroppingBox(deltaX, deltaY)
  } else {
    moveCroppingBox(deltaX, deltaY)
  }
}

const moveCroppingBox = (deltaX: number, deltaY: number) => {
  const previewImage = document.getElementById(
    'kun-clip-preview'
  ) as HTMLImageElement
  const containerWidth = previewImage.clientWidth
  const containerHeight = previewImage.clientHeight

  croppingBox.value.x = Math.max(
    0,
    Math.min(
      croppingBox.value.x + deltaX,
      containerWidth - croppingBox.value.width
    )
  )
  croppingBox.value.y = Math.max(
    0,
    Math.min(
      croppingBox.value.y + deltaY,
      containerHeight - croppingBox.value.height
    )
  )
}

const resizeCroppingBox = (deltaX: number, deltaY: number) => {
  const previewImage = document.getElementById(
    'kun-clip-preview'
  ) as HTMLImageElement
  const containerWidth = previewImage.clientWidth
  const containerHeight = previewImage.clientHeight
  const minSize = 20

  const handle = croppingBox.value.resizeHandle

  if (handle.includes('right')) {
    croppingBox.value.width = Math.min(
      Math.max(minSize, croppingBox.value.width + deltaX),
      containerWidth - croppingBox.value.x
    )
  }
  if (handle.includes('bottom')) {
    croppingBox.value.height = Math.min(
      Math.max(minSize, croppingBox.value.height + deltaY),
      containerHeight - croppingBox.value.y
    )
  }
  if (handle.includes('left')) {
    const newWidth = Math.max(minSize, croppingBox.value.width - deltaX)
    const newX = croppingBox.value.x + deltaX
    if (newX >= 0) {
      croppingBox.value.x = newX
      croppingBox.value.width = newWidth
    }
  }
  if (handle.includes('top')) {
    const newHeight = Math.max(minSize, croppingBox.value.height - deltaY)
    const newY = croppingBox.value.y + deltaY
    if (newY >= 0) {
      croppingBox.value.y = newY
      croppingBox.value.height = newHeight
    }
  }

  if (aspectRatio) {
    croppingBox.value.height = croppingBox.value.width / aspectRatio
    if (croppingBox.value.y + croppingBox.value.height > containerHeight) {
      croppingBox.value.height = containerHeight - croppingBox.value.y
      croppingBox.value.width = croppingBox.value.height * aspectRatio
    }
  }
}

const handleMouseUp = () => {
  croppingBox.value.isDragging = false
  croppingBox.value.resizeHandle = ''
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

export const handleCrop = async (imageBlob: Blob) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const imgUrl = URL.createObjectURL(imageBlob)
  const img = new Image()
  img.src = imgUrl

  const previewImage = document.getElementById(
    'kun-clip-preview'
  ) as HTMLImageElement
  const containerWidth = previewImage.clientWidth
  const containerHeight = previewImage.clientHeight

  const croppedImage = await new Promise<Blob | null>((resolve) => {
    img.onload = () => {
      if (ctx) {
        const { x, y, width, height } = croppingBox.value
        const scaleX = img.width / containerWidth
        const scaleY = img.height / containerHeight

        canvas.width = width
        canvas.height = height

        ctx.drawImage(
          img,
          x * scaleX,
          y * scaleY,
          width * scaleX,
          height * scaleY,
          0,
          0,
          width,
          height
        )

        canvas.toBlob((blob) => {
          resolve(blob)
        })
      }

      URL.revokeObjectURL(imgUrl)
    }
  })

  return croppedImage
}
