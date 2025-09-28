<script lang="ts" setup>
interface SliderProps {
  min?: number
  max?: number
  step?: number
}

const value = defineModel<number>({ required: true })
const props = withDefaults(defineProps<SliderProps>(), {
  min: 17,
  max: 77,
  step: 1
})

const sliderRef = ref<HTMLElement | null>(null)
const dragging = ref(false)

const state = reactive({
  min: props.min,
  max: props.max,
  step: props.step
})

const fillerWidth = computed(
  () => ((value.value - state.min) / (state.max - state.min)) * 100 + '%'
)

const thumbStyle = computed(() => ({
  left: fillerWidth.value,
  transform: 'translate(-50%, -50%)'
}))

const startDrag = (e: MouseEvent | TouchEvent) => {
  dragging.value = true
  updateSliderValue(e)
  window.addEventListener('mousemove', updateSliderValue)
  window.addEventListener('touchmove', updateSliderValue)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchend', stopDrag)
}

const stopDrag = () => {
  dragging.value = false
  window.removeEventListener('mousemove', updateSliderValue)
  window.removeEventListener('touchmove', updateSliderValue)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchend', stopDrag)
}

const updateSliderValue = (e: MouseEvent | TouchEvent) => {
  if (!sliderRef.value) return

  const rect = sliderRef.value.getBoundingClientRect()
  const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  const newValue =
    ((clientX - rect.left) / rect.width) * (state.max - state.min) + state.min

  value.value = Math.min(
    state.max,
    Math.max(state.min, Math.round(newValue / state.step) * state.step)
  )
}

onUnmounted(() => {
  stopDrag()
})
</script>

<template>
  <div
    class="kun-slider"
    ref="sliderRef"
    @mousedown.passive="startDrag"
    @touchstart.passive.stop="startDrag"
  >
    <div class="bg-default relative h-2 w-full rounded-full">
      <div
        class="bg-primary absolute h-full rounded-full"
        :style="{ width: fillerWidth }"
      />
      <div
        class="border-primary absolute top-[50%] size-5 cursor-grab rounded-full border-2 bg-white active:cursor-grabbing active:border-3 dark:bg-black"
        role="slider"
        :style="thumbStyle"
        @mousedown.passive="startDrag"
        @touchstart.passive.stop="startDrag"
        :tabindex="0"
        :aria-valuenow="value"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-orientation="'horizontal'"
      />
    </div>
  </div>
</template>
