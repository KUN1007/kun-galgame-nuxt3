<script lang="ts" setup>
interface SliderProps {
  min: number
  max: number
  step: number
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
    <div class="slider-track">
      <div class="slider-filler" :style="{ width: fillerWidth }" />
      <div
        class="slider-thumb"
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

<style lang="scss" scoped>
.slider-track {
  position: relative;
  background-color: var(--kungalgame-gray-4);
  border-radius: 9999px;
  width: 100%;
  height: 7px;
}

.slider-filler {
  position: absolute;
  background-color: var(--kungalgame-blue-5);
  height: 100%;
  border-radius: inherit;
}

.slider-thumb {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  background-color: var(--kungalgame-white);
  border: 3px solid var(--kungalgame-blue-5);
  border-radius: 50%;
  cursor: grab;
  box-shadow: var(--shadow);
  transition: border 0.1s;

  &:active {
    cursor: grabbing;
    border: 4px solid var(--kungalgame-blue-5);
  }
}
</style>
