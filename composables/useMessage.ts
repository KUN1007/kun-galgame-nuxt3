import { render, h, ref } from 'vue'
import Message from '~/components/kun/alert/Message.vue'
import { infoMessages } from '~/error/kunMessage'

type MessageType = `warn` | `success` | `error` | `info`

const messageCount = ref(0)

/**
 * @param {number | string} messageData - Message i18n object
 * @param {type} type - Type of the message, can be one of `warn`, `success`, `error`, or `info`
 * @param {number} duration - Display duration of the message, optional, default is 3 seconds
 * @param {boolean} richText - Whether the message text support html
 */
export const useMessage = (
  messageData: number | string,
  type: MessageType,
  duration?: number,
  richText?: boolean
) => {
  let timeout: NodeJS.Timeout | null = null
  // IMPORTANT: string type is only available for error messages, and the number type for frontend messages map
  const message =
    typeof messageData === 'string' ? messageData : infoMessages[messageData]

  messageCount.value++
  render(null, document.body)

  const messageNode = h(Message, {
    message,
    type,
    duration,
    richText
  })

  const time = duration || 3000

  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    messageCount.value--

    if (!messageCount.value) {
      render(null, document.body)
    }
  }, time)

  render(messageNode, document.body)
}
