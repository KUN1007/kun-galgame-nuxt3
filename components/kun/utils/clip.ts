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
const previewImage = ref<HTMLImageElement | null>(null)
const croppedImage = ref<Blob | null>(null)

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
  croppingBox.value.x = Math.max(0, croppingBox.value.x + deltaX)
  croppingBox.value.y = Math.max(0, croppingBox.value.y + deltaY)
}

const resizeCroppingBox = (deltaX: number, deltaY: number) => {
  const handle = croppingBox.value.resizeHandle
  const minSize = 20

  if (handle.includes('right')) {
    croppingBox.value.width = Math.max(
      minSize,
      croppingBox.value.width + deltaX
    )
  }
  if (handle.includes('bottom')) {
    croppingBox.value.height = Math.max(
      minSize,
      croppingBox.value.height + deltaY
    )
  }
  if (handle.includes('left')) {
    croppingBox.value.width = Math.max(
      minSize,
      croppingBox.value.width - deltaX
    )
    croppingBox.value.x += deltaX
  }
  if (handle.includes('top')) {
    croppingBox.value.height = Math.max(
      minSize,
      croppingBox.value.height - deltaY
    )
    croppingBox.value.y += deltaY
  }

  if (aspectRatio) {
    croppingBox.value.height = croppingBox.value.width / aspectRatio
  }
}

const handleMouseUp = () => {
  croppingBox.value.isDragging = false
  croppingBox.value.resizeHandle = ''
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

export const handleCrop = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (previewImage.value && ctx) {
    const { x, y, width, height } = croppingBox.value
    const imgWidth = previewImage.value.naturalWidth
    const imgHeight = previewImage.value.naturalHeight

    canvas.width = width
    canvas.height = height

    ctx.drawImage(
      previewImage.value,
      (x / 300) * imgWidth,
      (y / 300) * imgHeight,
      (width / 300) * imgWidth,
      (height / 300) * imgHeight,
      0,
      0,
      width,
      height
    )

    canvas.toBlob((blob) => {
      if (blob) {
        croppedImage.value = blob
      }
    })
  }

  return croppedImage.value
}
