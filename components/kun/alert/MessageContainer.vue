<script setup lang="ts">
import { computed } from 'vue'
import {
  useMessageState,
  type MessagePosition,
  type MessageOptions
} from '~/composables/useMessage'
import MessageItem from './MessageItem.vue'

const { messages, removeMessage } = useMessageState()

const positionedMessages = computed(() => {
  const groups: Record<MessagePosition, MessageOptions[]> = {
    'top-left': [],
    'top-center': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-center': [],
    'bottom-right': []
  }
  messages.value.forEach((msg) => {
    if (groups[msg.position]) groups[msg.position].push(msg)
  })
  return groups
})

const positionClasses: Record<MessagePosition, string> = {
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'top-left': 'top-4 left-4 items-start',
  'top-right': 'top-4 right-4 items-end',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end'
}
</script>

<template>
  <div
    v-for="(msgs, position) in positionedMessages"
    :key="position"
    :class="[
      'pointer-events-none fixed z-[7777] flex w-full max-w-sm flex-col p-4',
      positionClasses[position as MessagePosition]
    ]"
  >
    <TransitionGroup name="message-list" tag="div" class="w-full">
      <MessageItem
        v-for="msg in msgs"
        :key="msg.id"
        v-bind="msg"
        class="pointer-events-auto"
        @remove="removeMessage"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.message-list-move {
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.message-list-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.message-list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  position: absolute;
  width: 100%;
}

.message-list-enter-from,
.message-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

[class*='top-'] .message-list-enter-from,
[class*='top-'] .message-list-leave-to {
  transform: translateY(-30px) scale(0.8);
}

[class*='bottom-'] .message-list-enter-from,
[class*='bottom-'] .message-list-leave-to {
  transform: translateY(30px) scale(0.8);
}
</style>
