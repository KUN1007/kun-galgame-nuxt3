<script setup lang="ts">
import { ref, computed, watchEffect, onBeforeUnmount } from 'vue'
import { useScroll, useElementSize, useEventListener } from '@vueuse/core'

interface Props {
  axis?: 'horizontal' | 'vertical'
  shadowColor?: string
  shadowSize?: string
  className?: string
  contentClass?: string
  draggable?: boolean
  dragThreshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  axis: 'horizontal',
  shadowColor: 'var(--color-background)',
  shadowSize: '2rem',
  className: '',
  contentClass: '',
  draggable: false,
  dragThreshold: 6
})

const scrollContainer = ref<HTMLElement | null>(null)
const contentWrapper = ref<HTMLElement | null>(null)

const axis = computed(() => props.axis)

const { x: scrollLeft, y: scrollTop } = useScroll(scrollContainer, {
  throttle: 50
})
const { width: contentWidth, height: contentHeight } =
  useElementSize(contentWrapper)
const { width: containerWidth, height: containerHeight } =
  useElementSize(scrollContainer)

const showStartShadow = ref(false)
const showEndShadow = ref(false)

watchEffect(() => {
  if (!scrollContainer.value) return
  const epsilon = 1
  if (props.axis === 'horizontal') {
    showStartShadow.value = scrollLeft.value > epsilon
    showEndShadow.value =
      contentWidth.value - containerWidth.value - scrollLeft.value > epsilon
  } else {
    showStartShadow.value = scrollTop.value > epsilon
    showEndShadow.value =
      contentHeight.value - containerHeight.value - scrollTop.value > epsilon
  }
})

const startShadowClasses = computed(() =>
  props.axis === 'horizontal' ? 'left-0 top-0 bottom-0' : 'top-0 left-0 right-0'
)
const endShadowClasses = computed(() =>
  props.axis === 'horizontal'
    ? 'right-0 top-0 bottom-0'
    : 'bottom-0 left-0 right-0'
)
const shadowStyles = computed(() => {
  const sizeProperty = props.axis === 'horizontal' ? 'width' : 'height'
  const startGradient =
    props.axis === 'horizontal'
      ? `linear-gradient(to right, ${props.shadowColor}, transparent)`
      : `linear-gradient(to bottom, ${props.shadowColor}, transparent)`
  const endGradient =
    props.axis === 'horizontal'
      ? `linear-gradient(to left, ${props.shadowColor}, transparent)`
      : `linear-gradient(to top, ${props.shadowColor}, transparent)`

  return {
    start: {
      [sizeProperty]: props.shadowSize,
      backgroundImage: startGradient
    } as Record<string, string>,
    end: {
      [sizeProperty]: props.shadowSize,
      backgroundImage: endGradient
    } as Record<string, string>
  }
})

const isDragging = ref(false)
const preventClick = ref(false)
let startPointerX = 0
let startScroll = 0
let prevUserSelect = ''
const DRAG_THRESHOLD = props.dragThreshold ?? 6

// drag flick
let lastX = 0
let lastTime = 0
let velocity = 0
let rafId: number | null = null

const onPointerDown = (e: PointerEvent) => {
  if (!props.draggable || props.axis !== 'horizontal') return
  const el = scrollContainer.value
  if (!el) return
  if (e.pointerType === 'mouse' && e.button !== 0) return

  isDragging.value = true
  preventClick.value = false
  startPointerX = e.clientX
  startScroll = el.scrollLeft

  try {
    el.setPointerCapture(e.pointerId)
  } catch (e) {
    console.log(e)
  }

  prevUserSelect = document.body.style.userSelect
  document.body.style.userSelect = 'none'

  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  lastX = e.clientX
  lastTime = performance.now()
  velocity = 0
}

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging.value || props.axis !== 'horizontal') {
    return
  }
  const el = scrollContainer.value
  if (!el) {
    return
  }

  e.preventDefault()

  const curX = e.clientX
  const delta = curX - startPointerX
  if (Math.abs(delta) > DRAG_THRESHOLD) preventClick.value = true
  el.scrollLeft = startScroll - delta

  const now = performance.now()
  const dt = now - lastTime
  if (dt > 0) {
    velocity = (curX - lastX) / dt // px/ms
    lastX = curX
    lastTime = now
  }
}

const endDrag = (e?: PointerEvent) => {
  if (!isDragging.value) {
    return
  }
  const el = scrollContainer.value
  if (el && e) {
    el.releasePointerCapture(e.pointerId)
  }
  isDragging.value = false
  document.body.style.userSelect = prevUserSelect ?? ''

  const FRICTION = 0.95
  const MIN_VELOCITY = 0.02

  const step = () => {
    if (!el) {
      return
    }
    el.scrollLeft -= velocity * 16 // a frame
    velocity *= FRICTION
    if (Math.abs(velocity) > MIN_VELOCITY) {
      rafId = requestAnimationFrame(step)
    } else {
      rafId = null
    }
  }
  if (Math.abs(velocity) > MIN_VELOCITY) {
    rafId = requestAnimationFrame(step)
  }

  setTimeout(() => {
    preventClick.value = false
  }, 0)
}

useEventListener(scrollContainer, 'pointerdown', onPointerDown)
useEventListener(scrollContainer, 'pointermove', onPointerMove, {
  passive: false
})
useEventListener(scrollContainer, 'pointerup', endDrag)
useEventListener(scrollContainer, 'pointercancel', endDrag)
useEventListener(scrollContainer, 'lostpointercapture', endDrag)
useEventListener(
  scrollContainer,
  'click',
  (e: Event) => {
    if (preventClick.value) {
      e.preventDefault()
      e.stopImmediatePropagation()
    }
  },
  { capture: true }
)

onBeforeUnmount(() => {
  document.body.style.userSelect = prevUserSelect ?? ''
  if (rafId) cancelAnimationFrame(rafId)
})

const touchActionStyle = computed(() => ({
  touchAction: 'pan-y'
}))
</script>

<template>
  <div class="relative">
    <div
      aria-hidden="true"
      :class="
        cn(
          'pointer-events-none absolute z-10 transition-opacity',
          startShadowClasses,
          showStartShadow ? 'opacity-100' : 'opacity-0'
        )
      "
      :style="shadowStyles.start"
    />

    <div
      ref="scrollContainer"
      tabindex="0"
      role="region"
      :aria-label="props.className || 'scrollable content'"
      :class="
        cn(
          'scrollbar-hide',
          axis === 'horizontal' ? 'overflow-x-auto' : 'overflow-y-auto',
          props.className,
          draggable ? 'cursor-grab' : '',
          isDragging ? 'cursor-grabbing' : ''
        )
      "
      :style="touchActionStyle"
    >
      <div
        ref="contentWrapper"
        :class="
          cn(
            axis === 'horizontal'
              ? 'flex w-max gap-3'
              : 'flex w-full flex-col gap-3',
            props.contentClass
          )
        "
      >
        <slot />
      </div>
    </div>

    <div
      aria-hidden="true"
      :class="
        cn(
          'pointer-events-none absolute z-10 transition-opacity',
          endShadowClasses,
          showEndShadow ? 'opacity-100' : 'opacity-0'
        )
      "
      :style="shadowStyles.end"
    />
  </div>
</template>
