<script setup lang="ts">
import type { AsideItem } from '~/types/api/chat-message'

defineProps<{
  title: string
  data: AsideItem
}>()
</script>

<template>
  <KunLink
    color="default"
    underline="none"
    class-name="hover:bg-primary/20 flex cursor-pointer flex-nowrap gap-3 rounded-lg p-2 transition-colors hover:opacity-80"
    :to="`/message/${data.route as 'system' | 'notice'}`"
  >
    <KunImage src="/apple-touch-icon.png" class="h-12 w-12 rounded-full" />
    <div class="justify-space flex w-full flex-col">
      <div class="flex items-center justify-between">
        <span class="font-bold">{{ title }}</span>
        <span class="text-default-500 text-sm" v-if="data.lastMessageTime">
          {{ formatTimeDifference(data.lastMessageTime) }}
        </span>
      </div>

      <div class="flex items-center justify-between text-sm">
        <slot name="system" />
        <span class="line-clamp-1 break-all">
          {{ markdownToText(data.content) }}
        </span>
        <KunBadge
          class-name="whitespace-nowrap"
          color="primary"
          v-if="data.unreadCount"
        >
          {{ data.unreadCount }}
        </KunBadge>
        <KunBadge
          class-name="whitespace-nowrap"
          color="default"
          v-if="!data.unreadCount"
        >
          {{ data.count }}
        </KunBadge>
      </div>
    </div>
  </KunLink>
</template>
