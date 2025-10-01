<script setup lang="ts">
import {
  KUN_GALGAME_DIMENSIONS,
  KUN_GALGAME_DIM_LABELS,
  type KunGalgameDim
} from '~/constants/galgame-rating'

const props = withDefaults(
  defineProps<{
    modelValue: Record<KunGalgameDim, number>
    max?: number
    size?: number
    readonly?: boolean
    labelClass?: string
  }>(),
  {
    max: 10,
    size: 240,
    readonly: false,
    labelClass: ''
  }
)
const emit = defineEmits<{
  'update:modelValue': [Record<KunGalgameDim, number>]
}>()

const axes = KUN_GALGAME_DIMENSIONS.map((dim) => ({
  key: dim,
  label: KUN_GALGAME_DIM_LABELS[dim]
}))
type AxisKey = (typeof axes)[number]['key']

const center = computed(() => ({ x: props.size / 2, y: props.size / 2 }))
const radius = computed(() => props.size / 2 - 20)
const values = ref(props.modelValue)
watch(
  () => props.modelValue,
  () => (values.value = props.modelValue)
)

const points = computed(() => {
  const angleStep = (Math.PI * 2) / axes.length
  return axes.map((axis, i) => {
    const raw = values.value[axis.key] ?? 0
    const val = Math.max(0, Math.min(props.max, raw))
    const r = (val / props.max) * radius.value
    const angle = -Math.PI / 2 + i * angleStep
    const x = center.value.x + r * Math.cos(angle)
    const y = center.value.y + r * Math.sin(angle)
    return `${x},${y}`
  })
})

const ringPaths = computed(() => {
  const rings: string[] = []
  const angleStep = (Math.PI * 2) / axes.length
  for (let level = 1; level <= props.max; level++) {
    const r = (level / props.max) * radius.value
    const ringPoints: string[] = []
    for (let i = 0; i < axes.length; i++) {
      const angle = -Math.PI / 2 + i * angleStep
      ringPoints.push(
        `${center.value.x + r * Math.cos(angle)},${center.value.y + r * Math.sin(angle)}`
      )
    }
    rings.push(ringPoints.join(' '))
  }
  return rings
})

const onClick = (e: MouseEvent) => {
  if (props.readonly) return
  const rect = (e.currentTarget as SVGElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const dx = x - center.value.x
  const dy = y - center.value.y
  const angle = Math.atan2(dy, dx)
  const idx =
    Math.round(
      ((angle + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2)) /
        ((Math.PI * 2) / axes.length)
    ) % axes.length
  const dist = Math.sqrt(dx * dx + dy * dy)
  const val = Math.max(
    0,
    Math.min(props.max, Math.round((dist / radius.value) * props.max))
  )
  const key = axes[idx].key as AxisKey
  const next = { ...values.value, [key]: val }
  emit('update:modelValue', next)
}
</script>

<template>
  <div class="flex flex-col items-center space-y-2 select-none">
    <svg
      :width="size"
      :height="size"
      @click="onClick"
      :class="readonly ? 'cursor-default' : 'cursor-pointer'"
    >
      <template v-for="(ring, i) in ringPaths" :key="i">
        <polygon
          :points="ring"
          fill="none"
          class="stroke-default-200"
          stroke-width="0.5"
        />
      </template>

      <template v-for="(axis, i) in axes" :key="axis.key">
        <line
          :x1="center.x"
          :y1="center.y"
          :x2="
            center.x +
            radius * Math.cos(-Math.PI / 2 + i * ((2 * Math.PI) / axes.length))
          "
          :y2="
            center.y +
            radius * Math.sin(-Math.PI / 2 + i * ((2 * Math.PI) / axes.length))
          "
          class="stroke-default-300"
          stroke-width="0.5"
        />
      </template>

      <polygon
        :points="points.join(' ')"
        class="fill-secondary/30 stroke-secondary"
        stroke-width="1.5"
      />

      <template v-for="(axis, i) in axes" :key="axis.key">
        <text
          :x="
            center.x +
            (radius + 10) *
              Math.cos(-Math.PI / 2 + i * ((2 * Math.PI) / axes.length))
          "
          :y="
            center.y +
            (radius + 10) *
              Math.sin(-Math.PI / 2 + i * ((2 * Math.PI) / axes.length))
          "
          text-anchor="middle"
          alignment-baseline="middle"
          :class="cn('fill-current text-xs', labelClass)"
        >
          {{ axis.label }}
        </text>
      </template>
    </svg>
  </div>
</template>
