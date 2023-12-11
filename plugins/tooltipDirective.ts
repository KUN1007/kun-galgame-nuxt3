import Cookies from 'js-cookie'
import type { DirectiveBinding } from 'vue'

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

  const localeCookies = Cookies.get('kungalgame-language')
  const locale = localeCookies ? localeCookies : 'en'
  const messageI18n = locale === 'en' ? message.en : message.zh

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
  })
})
