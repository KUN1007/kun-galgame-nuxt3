<script setup lang="ts">
import type { ChatMessage } from '~/types/api/chat-message'

defineProps<{
  message: ChatMessage
  isSent: boolean
}>()
</script>

<template>
  <div
    class="flex w-full items-end gap-2"
    :class="isSent ? 'flex-row-reverse' : 'flex-row'"
  >
    <KunAvatar
      :disable-floating="true"
      :user="message.sender"
      class="mb-auto"
    />

    <div
      class="relative max-w-[75%] rounded-lg p-3"
      :class="
        isSent
          ? 'bg-primary/20 border-primary/20 border'
          : 'bg-background border-default-300 border'
      "
    >
      <div class="flex items-end">
        <span
          class="text-sm font-medium"
          :class="isSent ? 'text-primary' : 'text-secondary'"
        >
          {{ message.sender.name }}
        </span>
      </div>

      <div class="mt-1 text-sm leading-relaxed">
        <span>{{ message.content }}</span>
        <span class="text-default-500 ml-2 text-xs">
          {{ formatTimeDifference(message.created) }}
        </span>
      </div>
    </div>
  </div>
</template>
