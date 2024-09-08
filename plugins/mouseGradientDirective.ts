import type { DirectiveBinding } from 'vue'

interface HTMLElementWithCleanup extends HTMLElement {
  _cleanup?: () => void
}

interface GradientBinding {
  color: string
  radius: number
}

const initializeGradient = (
  element: HTMLElementWithCleanup,
  binding: DirectiveBinding
) => {
  const { color, radius } = (binding.value as GradientBinding) || {
    color: '--kungalgame-trans-blue-2',
    radius: 70
  }

  const gradientStyle: { background: string } = { background: '' }

  const onMouseMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    gradientStyle.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, 
      var(${color}), transparent ${radius}%)`

    element.style.background = gradientStyle.background
  }

  const onMouseLeave = () => {
    element.style.background = ''
  }

  element.addEventListener('mousemove', onMouseMove)
  element.addEventListener('mouseleave', onMouseLeave)

  element._cleanup = () => {
    element.removeEventListener('mousemove', onMouseMove)
    element.removeEventListener('mouseleave', onMouseLeave)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('kun-gradient', {
    mounted(element: HTMLElementWithCleanup, binding: DirectiveBinding) {
      initializeGradient(element, binding)
    },

    updated(element: HTMLElementWithCleanup, binding: DirectiveBinding) {
      initializeGradient(element, binding)
    },

    beforeUnmount(element: HTMLElementWithCleanup) {
      if (element._cleanup) {
        element._cleanup()
      }
    }
  })
})
