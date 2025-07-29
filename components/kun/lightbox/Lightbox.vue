<script setup lang="ts">
interface ImageItem {
  src: string
  alt?: string
}

const props = defineProps<{
  images: ImageItem[]
  isOpen: boolean
  initialIndex?: number
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const MIN_SCALE = 1
const MAX_SCALE = 5
const SWIPE_THRESHOLD = 50

const currentIndex = ref(props.initialIndex || 0)
const scale = ref(1)
const position = reactive({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })
const lastTouch = reactive({ x: 0, y: 0 })
const lastTouchDistance = ref(0)
const dragStartTime = ref(0)
const initialDragPosition = reactive({ x: 0, y: 0 })

const imageRef = ref<HTMLImageElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const currentImage = computed(() => props.images[currentIndex.value]?.src || '')
const currentAlt = computed(() => props.images[currentIndex.value]?.alt || '')

const transformStyle = computed(() => ({
  transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale.value})`,
  transition: isDragging.value ? 'none' : 'transform 0.3s ease-out'
}))

const resetTransform = () => {
  scale.value = MIN_SCALE
  position.x = 0
  position.y = 0
}

watch(
  () => props.initialIndex,
  () => {
    currentIndex.value = props.initialIndex || 0
    resetTransform()
  }
)

const handleKunLightBoxStatus = (value: boolean) => {
  if (value) {
    emit('update:isOpen', value)
  } else {
    emit('update:isOpen', false)
    resetTransform()
  }
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
  resetTransform()
}

const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length
  resetTransform()
}

const getBounds = () => {
  if (!imageRef.value || !containerRef.value) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  }

  const container = containerRef.value.getBoundingClientRect()
  const image = imageRef.value.getBoundingClientRect()

  const scaledWidth = image.width * scale.value
  const scaledHeight = image.height * scale.value

  const maxX = Math.max(0, (scaledWidth - container.width) / 2)
  const maxY = Math.max(0, (scaledHeight - container.height) / 2)

  return {
    minX: -maxX,
    maxX,
    minY: -maxY,
    maxY
  }
}

const constrainPosition = (x: number, y: number) => {
  if (scale.value <= 1) {
    return { x: 0, y: 0 }
  }

  const bounds = getBounds()
  return {
    x: Math.min(Math.max(x, bounds.minX), bounds.maxX),
    y: Math.min(Math.max(y, bounds.minY), bounds.maxY)
  }
}

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()

  const delta = -e.deltaY
  const zoomFactor = 0.2

  const newScale = scale.value + (delta > 0 ? zoomFactor : -zoomFactor)

  const clampedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale))

  if (clampedScale !== scale.value) {
    const rect = containerRef.value?.getBoundingClientRect()
    if (!rect) {
      return
    }

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const scaleChange = clampedScale / scale.value

    const newPosition = {
      x: mouseX - (mouseX - position.x) * scaleChange,
      y: mouseY - (mouseY - position.y) * scaleChange
    }

    const constrained = constrainPosition(newPosition.x, newPosition.y)
    position.x = constrained.x
    position.y = constrained.y

    scale.value = clampedScale
  }
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  dragStartTime.value = Date.now()

  const point = 'touches' in e ? e.touches[0] : e
  dragStart.x = point.clientX - position.x
  dragStart.y = point.clientY - position.y
  initialDragPosition.x = point.clientX
  initialDragPosition.y = point.clientY
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  const point = 'touches' in e ? e.touches[0] : e

  if (scale.value <= 1) {
    const deltaX = point.clientX - initialDragPosition.x
    position.x = deltaX
    return
  }

  const newPosition = {
    x: point.clientX - dragStart.x,
    y: point.clientY - dragStart.y
  }

  const constrained = constrainPosition(newPosition.x, newPosition.y)
  position.x = constrained.x
  position.y = constrained.y
}

const stopDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  const point =
    'touches' in e ? (e as TouchEvent).changedTouches[0] : (e as MouseEvent)
  const deltaX = point.clientX - initialDragPosition.x
  const deltaTime = Date.now() - dragStartTime.value
  const velocity = Math.abs(deltaX) / deltaTime

  if (
    scale.value <= 1 &&
    Math.abs(deltaX) > SWIPE_THRESHOLD &&
    velocity > 0.2
  ) {
    if (deltaX > 0) {
      prev()
    } else {
      next()
    }
    position.x = 0
    position.y = 0
  }

  isDragging.value = false
}

const handleDoubleClick = (e: MouseEvent) => {
  const rect = containerRef.value?.getBoundingClientRect()
  if (!rect) return

  if (scale.value > MIN_SCALE) {
    resetTransform()
  } else {
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    scale.value = 2
    const newPosition = {
      x: mouseX - rect.width / 2,
      y: mouseY - rect.height / 2
    }

    const constrained = constrainPosition(newPosition.x, newPosition.y)
    position.x = constrained.x
    position.y = constrained.y
  }
}

const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 2) {
    const touch1 = e.touches[0]
    const touch2 = e.touches[1]
    lastTouchDistance.value = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    )
    lastTouch.x = (touch1.clientX + touch2.clientX) / 2
    lastTouch.y = (touch1.clientY + touch2.clientY) / 2
  } else {
    startDrag(e)
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 2) {
    const touch1 = e.touches[0]
    const touch2 = e.touches[1]
    const currentDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    )
    const centerX = (touch1.clientX + touch2.clientX) / 2
    const centerY = (touch1.clientY + touch2.clientY) / 2

    const delta = (currentDistance - lastTouchDistance.value) * 0.01
    const newScale = Math.max(
      MIN_SCALE,
      Math.min(MAX_SCALE, scale.value + delta)
    )

    if (newScale !== scale.value) {
      const scaleChange = newScale / scale.value
      const dx = centerX - lastTouch.x
      const dy = centerY - lastTouch.y

      const newPosition = {
        x: (position.x + dx) * scaleChange,
        y: (position.y + dy) * scaleChange
      }

      const constrained = constrainPosition(newPosition.x, newPosition.y)
      position.x = constrained.x
      position.y = constrained.y
      scale.value = newScale
    }

    lastTouchDistance.value = currentDistance
    lastTouch.x = centerX
    lastTouch.y = centerY
  } else {
    onDrag(e)
  }
}

const downloadImage = async () => {
  try {
    const response = await fetch(currentImage.value)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = currentImage.value.split('/').pop() || 'image'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading image:', error)
  }
}

onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!props.isOpen) {
      return
    }

    switch (e.key) {
      case 'ArrowLeft':
        prev()
        break
      case 'ArrowRight':
        next()
        break
      case 'Escape':
        handleKunLightBoxStatus(false)
        break
    }
  }

  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<template>
  <KunModal
    :modal-value="isOpen"
    @update:modal-value="handleKunLightBoxStatus"
    :with-container="false"
  >
    <div
      v-if="isOpen"
      class="relative flex h-full w-full items-center justify-center"
    >
      <KunButton
        v-if="images.length > 1"
        :is-icon-only="true"
        color="default"
        size="xl"
        rounded="full"
        @click.stop="prev"
        class-name="absolute left-4 z-50 p-2"
      >
        <KunIcon name="lucide:chevron-left" />
      </KunButton>

      <KunButton
        v-if="images.length > 1"
        :is-icon-only="true"
        color="default"
        size="xl"
        rounded="full"
        @click.stop="next"
        class-name="absolute right-4 z-50 p-2"
      >
        <KunIcon name="lucide:chevron-right" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        color="default"
        size="xl"
        rounded="full"
        @click.stop="downloadImage"
        class-name="absolute right-4 bottom-4 z-50 p-2"
      >
        <KunIcon name="lucide:download" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        color="default"
        size="xl"
        rounded="full"
        @click.stop="() => handleKunLightBoxStatus(false)"
        class-name="absolute right-4 top-4 z-50 p-2"
      >
        <KunIcon name="lucide:x" />
      </KunButton>

      <div
        ref="containerRef"
        class="relative flex h-full w-full items-center justify-center overflow-hidden"
        @wheel.prevent="handleWheel"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @touchstart.passive="handleTouchStart"
        @touchmove.passive="handleTouchMove"
        @touchend="stopDrag"
        @dblclick="handleDoubleClick"
      >
        <img
          ref="imageRef"
          :src="currentImage"
          :alt="currentAlt"
          class="max-h-full max-w-full will-change-transform"
          :style="transformStyle"
          @load="resetTransform"
          draggable="false"
          @click.stop
        />
      </div>
    </div>
  </KunModal>
</template>
