import { render, h, ref } from 'vue'
import Message from '~/components/kun/alert/Message.vue'

type MessageType = `warn` | `success` | `error` | `info`

const messageCount = ref(0)

/**
 * @param {string} messageEN - Message in English
 * @param {string} messageCN - Message in Chinese
 * @param {type} type - Type of the message, can be one of `warn`, `success`, `error`, or `info`
 * @param {number} duration - Display duration of the message, optional, default is 3 seconds
 * @param {boolean} richText - Whether the message text support html
 */
export const useMessage = (
  messageEN: string,
  messageCN: string,
  type: MessageType,
  duration?: number,
  richText?: boolean
) => {
  messageCount.value++
  render(null, document.body)

  const messageNode = h(Message, {
    messageCN,
    messageEN,
    type,
    duration,
    richText
  })

  const time = duration || 3000

  setTimeout(() => {
    messageCount.value--

    if (!messageCount.value) {
      render(null, document.body)
    }
  }, time)

  render(messageNode, document.body)
}
