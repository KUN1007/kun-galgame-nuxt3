import Cookies from 'js-cookie'
import type { DirectiveBinding } from 'vue'

type Message = string | KunLanguage

interface TooltipBinding {
  message: Message
  position: 'top' | 'right' | 'bottom' | 'left'
}

const initializeTooltip = (element: HTMLElement, binding: DirectiveBinding) => {
  const { message, position } = (binding.value as TooltipBinding) || {
    message: '',
    position: 'left'
  }

  if (typeof message === 'string') {
    element.setAttribute('tooltip', message)
    element.setAttribute('position', position)
    return
  }

  const localeCookies = Cookies.get('kungalgame-language')
  const getDefaultLocale = () =>
    window?.location.href.match(/\/([a-z]{2}-[a-z]{2})\//)?.[1] ?? 'en-us'
  const locale = localeCookies || getDefaultLocale()

  if (typeof message === 'string') {
    element.setAttribute('tooltip', message)
  } else {
    element.setAttribute('tooltip', message[locale as Language])
  }

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
