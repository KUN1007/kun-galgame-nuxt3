// Reference: https://github.com/nextui-org/nextui useRipple

import { ref, onUnmounted } from 'vue'

export type RippleType = {
  key: number
  x: number
  y: number
  size: number
}

export const useRipple = () => {
  const ripples = ref<RippleType[]>([])
  const timeouts = new Set<NodeJS.Timeout>()

  const onClick = (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement

    const size = Math.max(target.clientWidth, target.clientHeight)
    const rect = target.getBoundingClientRect()

    ripples.value.push({
      key: Date.now(),
      size,
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2
    })

    const timeoutId = setTimeout(() => {
      ripples.value.shift()
      timeouts.delete(timeoutId)
    }, 600)

    timeouts.add(timeoutId)
  }

  onUnmounted(() => {
    timeouts.forEach((timeoutId) => clearTimeout(timeoutId))
    timeouts.clear()
    ripples.value = []
  })

  return {
    ripples,
    onClick
  }
}
