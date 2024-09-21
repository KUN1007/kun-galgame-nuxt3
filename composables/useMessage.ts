import { render, h, ref } from 'vue'
import Message from '~/components/kun/alert/Message.vue'
import {
  infoMessagesEN,
  infoMessagesJP,
  infoMessagesCN,
  infoMessagesTW
} from '~/error/kunMessage'

type MessageType = `warn` | `success` | `error` | `info`

const messageCount = ref(0)

/**
 * @param {number} messageData - Message i18n object
 * @param {type} type - Type of the message, can be one of `warn`, `success`, `error`, or `info`
 * @param {number} duration - Display duration of the message, optional, default is 3 seconds
 * @param {boolean} richText - Whether the message text support html
 */
export const useMessage = (
  messageData: number | KunLanguage,
  type: MessageType,
  duration?: number,
  richText?: boolean
) => {
  let timeout: NodeJS.Timeout | null = null
  let message: KunLanguage

  messageCount.value++
  render(null, document.body)

  if (typeof messageData === 'number') {
    message = {
      'en-us': infoMessagesEN[messageData],
      'ja-jp': infoMessagesJP[messageData],
      'zh-cn': infoMessagesCN[messageData],
      'zh-tw': infoMessagesTW[messageData]
    }
  } else {
    message = messageData
  }

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
