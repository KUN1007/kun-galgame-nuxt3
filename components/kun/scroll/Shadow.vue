<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useScroll, useElementSize } from '@vueuse/core'

interface Props {
  axis?: 'horizontal' | 'vertical'
  shadowColor?: string
  shadowSize?: string
  className?: string
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  axis: 'horizontal',
  shadowColor: 'var(--color-background)',
  shadowSize: '2rem',
  className: '',
  contentClass: ''
})

const scrollContainer = ref<HTMLElement | null>(null)
const contentWrapper = ref<HTMLElement | null>(null)

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
          props.className
        )
      "
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
