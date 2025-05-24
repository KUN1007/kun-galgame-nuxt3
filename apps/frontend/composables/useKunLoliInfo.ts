import { render, h, ref } from 'vue'
import Info from '~/components/kun/alert/Info.vue'

const messageCount = ref(0)

/**
 * @param {string} message - Kawaii loli message >_<
 * @param {number} duration - Message duration in seconds
 */
export const useKunLoliInfo = (message: string, duration?: number) => {
  let timeout: NodeJS.Timeout | null = null
  const durationMs = duration ? duration * 1000 : 3000

  messageCount.value++
  render(null, document.body)

  const messageNode = h(Info, {
    message,
    duration: durationMs
  })

  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    messageCount.value--

    if (!messageCount.value) {
      render(null, document.body)
    }
    // 500ms for Transition component
  }, durationMs + 500)

  render(messageNode, document.body)
}
