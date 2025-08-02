<script setup lang="ts">
import type { SystemMessage } from '~/types/api/message'

defineProps<{
  message: SystemMessage
}>()
</script>

<template>
  <div
    class="space-y-3 rounded-lg p-2"
    :class="message.status === 'read' ? 'message-read' : ''"
  >
    <div class="flex items-center break-all">
      <div class="ml-2 text-lg">
        <KunIcon
          class="text-secondary"
          v-if="message.status === 'unread'"
          name="lucide:info"
        />
        <KunIcon
          class="text-default"
          v-if="message.status === 'read'"
          name="lucide:check-check"
        />
      </div>
      <KunAvatar :disable-floating="true" :user="message.admin" />
      <span class="text-default-500 text-sm">
        {{ formatTimeDifference(message.created) }}
      </span>
    </div>

    <div class="leading-8 break-all" v-html="message.content['zh-cn']" />
  </div>
</template>
