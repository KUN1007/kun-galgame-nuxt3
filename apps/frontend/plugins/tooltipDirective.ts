import type { DirectiveBinding } from 'vue'

interface TooltipBinding {
  message: string
  position: 'top' | 'right' | 'bottom' | 'left'
}

const initializeTooltip = (element: HTMLElement, binding: DirectiveBinding) => {
  const { message, position } = (binding.value as TooltipBinding) || {
    message: '',
    position: 'top'
  }

  element.setAttribute('tooltip', message)
  element.setAttribute('position', position)
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tooltip', {
    mounted(element: HTMLElement, binding: DirectiveBinding) {
      initializeTooltip(element, binding)
    },
    updated(element: HTMLElement, binding: DirectiveBinding) {
      initializeTooltip(element, binding)
    }
  })
})
