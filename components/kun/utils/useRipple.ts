// Reference: https://github.com/nextui-org/nextui useRipple

import { ref } from 'vue'

export type RippleType = {
  key: number
  x: number
  y: number
  size: number
}

export const useRipple = () => {
  const ripples = ref<RippleType[]>([])

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

    setTimeout(() => {
      ripples.value.shift()
    }, 600)
  }

  return {
    ripples,
    onClick
  }
}
