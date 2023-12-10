import type { DirectiveBinding } from 'vue'
import { KUNGalgameLanguage } from '@/utils/getDefaultEnv'

interface TooltipBinding {
  message: {
    en: string
    zh: string
  }
  position: 'top' | 'right' | 'bottom' | 'left'
}

const initializeTooltip = (element: HTMLElement, binding: DirectiveBinding) => {
  const { message, position } = (binding.value as TooltipBinding) || {
    message: '',
    position: 'left',
  }

  const messageI18n = KUNGalgameLanguage() === 'en' ? message.en : message.zh

  element.setAttribute('tooltip', messageI18n)
  element.setAttribute('position', position)
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tooltip', {
    mounted(element: HTMLElement, binding: DirectiveBinding) {
      initializeTooltip(element, binding)
    },
    updated(element: HTMLElement, binding: DirectiveBinding) {
      initializeTooltip(element, binding)
    },
    getSSRProps(binding, vnode) {
      // you can provide SSR-specific props here
      return {}
    },
  })
})
