import { render, h, ref } from 'vue'
import KUNGalgameMessage from '~/components/global/alert/KUNGalgameMessage.vue'

type MessageType = `warn` | `success` | `error` | `info`

const messageCount = ref(0)

/**
 * @param {string} messageEN - Message in English
 * @param {string} messageCN - Message in Chinese
 * @param {type} type - Type of the message, can be one of `warn`, `success`, `error`, or `info`
 * @param {number} duration - Display duration of the message, optional, default is 3 seconds
 */
export const useMessage = (
  messageEN: string,
  messageCN: string,
  type: MessageType,
  duration?: number
) => {
  messageCount.value++
  render(null, document.body)

  const messageNode = h(KUNGalgameMessage, {
    messageCN,
    messageEN,
    type,
    duration,
  })

  const time = duration ? duration : 3000

  setTimeout(() => {
    messageCount.value--

    if (!messageCount.value) {
      render(null, document.body)
    }
  }, time)

  render(messageNode, document.body)
}
