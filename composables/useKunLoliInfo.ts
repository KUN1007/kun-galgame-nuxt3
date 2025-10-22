import { render, h, ref } from 'vue'
import Info from '~/components/kun/alert/Info.vue'

const messageCount = ref(0)
let containerEl: HTMLElement | null = null

/**
 * @param {string} message - Kawaii loli message >_<
 * @param {number} duration - Message duration in seconds
 */
export const useKunLoliInfo = (message: string, duration?: number) => {
  if (!import.meta.client) return

  // ensure a dedicated container is used instead of document.body to
  // avoid interfering with Nuxt page/layout transitions
  if (!containerEl) {
    containerEl = document.createElement('div')
    containerEl.id = 'kun-loli-info-root'
    containerEl.style.position = 'relative'
    document.body.appendChild(containerEl)
  }

  let timeout: NodeJS.Timeout | null = null
  const durationMs = duration ? duration * 1000 : 3000

  messageCount.value++
  // unmount any previous vnode mounted by this util before re-rendering
  render(null, containerEl)

  const messageNode = h(Info, {
    message,
    duration: durationMs
  })

  // Attach Nuxt app context so global components/plugins
  // (e.g. auto-registered components like KunImage) resolve correctly
  const nuxtApp = useNuxtApp()
  // vueApp._context is stable and intended for programmatic mounts
  messageNode.appContext = nuxtApp.vueApp._context

  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    messageCount.value--

    if (!messageCount.value && containerEl) {
      render(null, containerEl)
    }
    // 500ms for Transition component
  }, durationMs + 500)

  render(messageNode, containerEl)
}
