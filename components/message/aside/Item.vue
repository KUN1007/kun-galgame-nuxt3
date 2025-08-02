<script setup lang="ts">
import type { AsideItem } from '~/types/api/chat-message'

defineProps<{
  room: AsideItem
}>()
</script>

<template>
  <KunLink
    color="default"
    underline="none"
    class-name="hover:bg-primary/20 flex cursor-pointer flex-nowrap gap-3 rounded-lg p-2 transition-colors hover:opacity-80"
    :to="`/message/user/${room.route}`"
  >
    <KunAvatar
      :user="{
        id: parseInt(room.route),
        name: room.title,
        avatar: room.avatar
      }"
      size="xl"
      :disable-floating="true"
    />
    <div class="justify-space flex w-full flex-col">
      <div class="flex items-center justify-between">
        <span class="font-bold">{{ room.title }}</span>
        <span class="text-default-500 text-sm" v-if="room.lastMessageTime">
          {{ formatTimeDifference(room.lastMessageTime) }}
        </span>
      </div>

      <div class="flex items-center justify-between text-sm">
        <slot name="system" />
        <span class="line-clamp-1 break-all">
          {{ markdownToText(room.content) }}
        </span>
        <KunBadge
          class-name="whitespace-nowrap"
          color="primary"
          v-if="room.unreadCount"
        >
          {{ room.unreadCount }}
        </KunBadge>
        <KunBadge
          class-name="whitespace-nowrap"
          color="default"
          v-if="!room.unreadCount"
        >
          {{ room.count }}
        </KunBadge>
      </div>
    </div>
  </KunLink>
</template>
