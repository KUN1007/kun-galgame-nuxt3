<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

type PopoverPosition = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
interface Positioned {
  pos: PopoverPosition
  left: number
  top: number
}

const props = withDefaults(
  defineProps<{
    position?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
    innerClass?: string
    autoPosition?: boolean
  }>(),
  {
    position: 'bottom-start',
    innerClass: '',
    autoPosition: false
  }
)

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const popoverId = `kun-popover-${useId()}`
const popoverStyle = ref<Record<string, string>>({})
const chosenPosition = ref(props.position)

// avoid closed to screen edge
const PAGE_MARGIN = 8
// gap for Popover and trigger
const POPPER_GAP = 8

// candidates order
const candidatesFor = (initial: string): PopoverPosition[] => {
  switch (initial) {
    case 'bottom-end':
      return ['bottom-end', 'bottom-start', 'top-end', 'top-start']
    case 'bottom-start':
      return ['bottom-start', 'bottom-end', 'top-start', 'top-end']
    case 'top-end':
      return ['top-end', 'top-start', 'bottom-end', 'bottom-start']
    case 'top-start':
    default:
      return ['top-start', 'top-end', 'bottom-start', 'bottom-end']
  }
}

// compute popover position for container
const coordsFor = (
  pos: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end',
  anchor: { left: number; top: number; width: number; height: number },
  popW: number,
  popH: number
) => {
  switch (pos) {
    case 'bottom-start':
      return { left: anchor.left, top: anchor.top + anchor.height + POPPER_GAP }
    case 'bottom-end':
      return {
        left: anchor.left + anchor.width - popW,
        top: anchor.top + anchor.height + POPPER_GAP
      }
    case 'top-start':
      return { left: anchor.left, top: anchor.top - popH - POPPER_GAP }
    case 'top-end':
    default:
      return {
        left: anchor.left + anchor.width - popW,
        top: anchor.top - popH - POPPER_GAP
      }
  }
}

const positionClassForStaticPosition = computed(() => {
  switch (props.position) {
    case 'top-start':
      return 'bottom-full left-0 mb-2'
    case 'top-end':
      return 'bottom-full right-0 mb-2'
    case 'bottom-end':
      return 'top-full right-0 mt-2'
    default:
      return 'top-full left-0 mt-2'
  }
})

// main compute func
const computePosition = async (): Promise<void> => {
  if (!triggerRef.value || !popoverRef.value || !containerRef.value) {
    return
  }

  await nextTick()
  await new Promise((r) => requestAnimationFrame(r))

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popRect = popoverRef.value.getBoundingClientRect()
  const containerRect = containerRef.value.getBoundingClientRect()

  const viewportW = window.innerWidth
  const viewportH = window.innerHeight

  const anchor = {
    left: triggerRect.left - containerRect.left,
    top: triggerRect.top - containerRect.top,
    width: triggerRect.width,
    height: triggerRect.height
  }
  const popW = popRect.width
  const popH = popRect.height

  const candidates: PopoverPosition[] = candidatesFor(props.position!)

  let chosen: Positioned | null = null
  for (const c of candidates) {
    const { left, top } = coordsFor(c, anchor, popW, popH)
    const pageLeft = containerRect.left + left
    const pageTop = containerRect.top + top

    const fits =
      pageLeft >= PAGE_MARGIN &&
      pageTop >= PAGE_MARGIN &&
      pageLeft + popW <= viewportW - PAGE_MARGIN &&
      pageTop + popH <= viewportH - PAGE_MARGIN

    if (fits) {
      chosen = { pos: c, left, top }
      break
    }
  }

  if (!chosen) {
    let best: Positioned | null = null
    let bestOverflow = Number.POSITIVE_INFINITY

    for (const c of candidates) {
      const { left, top } = coordsFor(c, anchor, popW, popH)
      const pageLeft = containerRect.left + left
      const pageTop = containerRect.top + top

      const overflowLeft = Math.max(0, PAGE_MARGIN - pageLeft)
      const overflowRight = Math.max(
        0,
        pageLeft + popW - (viewportW - PAGE_MARGIN)
      )
      const overflowTop = Math.max(0, PAGE_MARGIN - pageTop)
      const overflowBottom = Math.max(
        0,
        pageTop + popH - (viewportH - PAGE_MARGIN)
      )

      const totalOverflow =
        overflowLeft + overflowRight + overflowTop + overflowBottom
      if (totalOverflow < bestOverflow) {
        bestOverflow = totalOverflow
        best = { pos: c, left, top }
      }
    }

    if (best) {
      let left = best.left
      let top = best.top
      const pageLeft = containerRect.left + left
      const pageTop = containerRect.top + top

      if (pageLeft < PAGE_MARGIN) left += PAGE_MARGIN - pageLeft
      if (pageLeft + popW > viewportW - PAGE_MARGIN)
        left -= pageLeft + popW - (viewportW - PAGE_MARGIN)
      if (pageTop < PAGE_MARGIN) top += PAGE_MARGIN - pageTop
      if (pageTop + popH > viewportH - PAGE_MARGIN)
        top -= pageTop + popH - (viewportH - PAGE_MARGIN)

      chosen = { pos: best.pos, left, top }
    }
  }

  if (chosen) {
    chosenPosition.value = chosen.pos
    popoverStyle.value = {
      left: `${Math.round(chosen.left)}px`,
      top: `${Math.round(chosen.top)}px`
    }
  } else {
    const fallback = coordsFor(props.position!, anchor, popW, popH)
    chosenPosition.value = props.position!
    popoverStyle.value = {
      left: `${Math.round(fallback.left)}px`,
      top: `${Math.round(fallback.top)}px`
    }
  }
}

const toggle = () => {
  isOpen.value = !isOpen.value
}
const close = (event: MouseEvent) => {
  if (
    !triggerRef.value?.contains(event.target as Node) &&
    !popoverRef.value?.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
})
useEventListener(document, 'click', close)

// re-compute on open / window size change / scroll / element size change
let ro: ResizeObserver | null = null
watch(
  () => isOpen.value,
  (open) => {
    if (open) {
      if (props.autoPosition) {
        computePosition()
        if (typeof ResizeObserver !== 'undefined') {
          if (ro) ro.disconnect()
          ro = new ResizeObserver(() => {
            if (isOpen.value) computePosition()
          })
          if (triggerRef.value) ro.observe(triggerRef.value)
          if (popoverRef.value) ro.observe(popoverRef.value)
          if (containerRef.value) ro.observe(containerRef.value)
        }
        useEventListener(window, 'resize', computePosition, { passive: true })
        useEventListener(window, 'scroll', computePosition, { passive: true })
      }
    } else {
      if (ro) {
        try {
          ro.disconnect()
        } catch (e) {
          //
        }
        ro = null
      }
    }
  }
)

onBeforeUnmount(() => {
  if (ro) {
    try {
      ro.disconnect()
    } catch (e) {
      //
    }
    ro = null
  }
})
</script>

<template>
  <div ref="containerRef" class="relative inline-block">
    <div
      ref="triggerRef"
      @click="toggle"
      @keydown.enter="toggle"
      @keydown.space.prevent="toggle"
      tabindex="0"
      role="button"
      aria-label="popover-trigger"
      :aria-expanded="isOpen"
      :aria-controls="popoverId"
    >
      <slot name="trigger" />
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        ref="popoverRef"
        :id="popoverId"
        role="dialog"
        :aria-hidden="!isOpen"
        class="absolute z-50 rounded-lg border bg-white shadow-lg dark:bg-black"
        :class="
          cn(autoPosition ? '' : positionClassForStaticPosition, innerClass)
        "
        :style="popoverStyle"
        @click.stop
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
