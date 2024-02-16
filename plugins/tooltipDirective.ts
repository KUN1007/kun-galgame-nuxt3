import Cookies from 'js-cookie'
import type { DirectiveBinding } from 'vue'

type Message =
  | string
  | {
      en: string
      zh: string
    }

interface TooltipBinding {
  message: Message
  position: 'top' | 'right' | 'bottom' | 'left'
}

const initializeTooltip = (element: HTMLElement, binding: DirectiveBinding) => {
  const { message, position } = (binding.value as TooltipBinding) || {
    message: '',
    position: 'left',
  }

  if (typeof message === 'string') {
    element.setAttribute('tooltip', message)
    element.setAttribute('position', position)
    return
  }

  const localeCookies = Cookies.get('kungalgame-language')
  const locale = localeCookies ? localeCookies : 'en-us'
  const messageI18n = locale === 'en-us' ? message.en : message.zh

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
