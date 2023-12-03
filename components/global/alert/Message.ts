import { render, h, ref } from 'vue'
import KUNGalgameMessage from './KUNGalgameMessage.vue'

type MessageType = `warn` | `success` | `error` | `info`

/**
 * @param {string} messageEN - Message in English
 * @param {string} messageCN - Message in Chinese
 * @param {type} type - Type of the message, can be one of `warn`, `success`, `error`, or `info`
 * @param {number} duration - Display duration of the message, optional, default is 3 seconds
 */

// Message count to prevent errors when destroying messages with new messages displayed
const messageCount = ref(0)

export default (
  messageEN: string,
  messageCN: string,
  type: MessageType,
  duration?: number
) => {
  // Increase the message count
  messageCount.value++
  // Remove the previous component first
  render(null, document.body)

  const messageNode = h(KUNGalgameMessage, {
    messageCN,
    messageEN,
    type,
    duration,
  })

  const time = duration ? duration : 3000

  // Remove the message after a specified time
  setTimeout(() => {
    // Decrease the message count
    messageCount.value--

    // Remove the component from the body when the message count is zero
    if (!messageCount.value) {
      // Remove the component from the body
      render(null, document.body)
    }
  }, time)

  render(messageNode, document.body)
}
