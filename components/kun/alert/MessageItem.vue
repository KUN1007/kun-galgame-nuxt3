<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import type { MessageType } from '~/composables/useMessage'

const props = defineProps<{
  id: string
  message: string
  type: MessageType
  duration: number
  richText?: boolean
  count: number
}>()

const emit = defineEmits<{
  remove: [id: string]
}>()

const isRichText = computed(() => props.richText ?? false)
const cssDuration = computed(() => `${props.duration}ms`)
const progressBarRef = ref<HTMLDivElement | null>(null)

let timer: NodeJS.Timeout | null = null
const remainingTime = ref(props.duration)
const startTime = ref(0)

const pauseTimer = () => {
  if (props.duration <= 0) {
    return
  }
  if (timer) {
    clearTimeout(timer)
  }
  if (progressBarRef.value) {
    progressBarRef.value.style.animationPlayState = 'paused'
  }

  const elapsed = Date.now() - startTime.value
  remainingTime.value -= elapsed
}

const resumeTimer = () => {
  if (props.duration <= 0) {
    return
  }

  startTime.value = Date.now()

  if (progressBarRef.value) {
    progressBarRef.value.style.animationPlayState = 'running'
  }

  timer = setTimeout(() => emit('remove', props.id), remainingTime.value)
}

onMounted(() => {
  if (props.duration > 0) {
    resumeTimer()
  }
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

watch(
  () => props.count,
  () => {
    if (timer) clearTimeout(timer)

    remainingTime.value = props.duration

    resumeTimer()
  },
  { flush: 'post' }
)

const typeStyles = computed(() => {
  switch (props.type) {
    case 'success':
      return {
        bg: 'bg-success-50 dark:bg-success-50/90',
        text: 'text-success-800',
        icon: 'text-success-500',
        progress: 'bg-success-400',
        iconName: 'lucide:check-circle-2'
      }
    case 'error':
      return {
        bg: 'bg-danger-50 dark:bg-danger-50/90',
        text: 'text-danger-800',
        icon: 'text-danger-500',
        progress: 'bg-danger-400',
        iconName: 'lucide:x-circle'
      }
    case 'warn':
      return {
        bg: 'bg-warning-50 dark:bg-warning-50/90',
        text: 'text-warning-800',
        icon: 'text-warning-500',
        progress: 'bg-warning-400',
        iconName: 'lucide:alert-triangle'
      }
    case 'info':
    default:
      return {
        bg: 'bg-primary-50 dark:bg-primary-50/90',
        text: 'text-primary-800',
        icon: 'text-primary-500',
        progress: 'bg-primary-400',
        iconName: 'lucide:info'
      }
  }
})
</script>

<template>
  <div
    :class="
      cn(
        'relative mb-3 flex w-full items-center overflow-hidden rounded-xl p-4 ring-1 ring-black/5 transition-all duration-300',
        typeStyles.bg,
        typeStyles.text
      )
    "
    @mouseenter="pauseTimer"
    @mouseleave="resumeTimer"
  >
    <Icon
      :class="cn('mt-0.5 mr-3 h-6 w-6 flex-shrink-0', typeStyles.icon)"
      :icon="typeStyles.iconName"
    />

    <div class="flex-1 text-sm font-medium">
      <span v-if="!isRichText">{{ message }}</span>
      <div v-else v-html="message" />
    </div>

    <span
      v-if="count > 1"
      class="ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/10 text-xs font-bold dark:bg-white/10"
    >
      {{ count }}
    </span>

    <div
      ref="progressBarRef"
      :key="count"
      class="progress-bar absolute bottom-0 left-0 h-1"
      :class="typeStyles.progress"
    />
  </div>
</template>

<style scoped>
:deep(*) {
  color: inherit;
}

@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.progress-bar {
  animation: shrink v-bind(cssDuration) linear forwards;
  animation-play-state: running;
}
</style>
