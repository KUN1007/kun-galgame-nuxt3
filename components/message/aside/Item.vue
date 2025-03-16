<script setup lang="ts">
import type { AsideItem } from '~/types/api/chat-message'

defineProps<{
  room: AsideItem
}>()
</script>

<template>
  <NuxtLink
    class="hover:bg-primary/20 flex cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:opacity-80"
    :to="`/message/user/${room.route}`"
  >
    <KunAvatar
      :user="{
        uid: parseInt(room.route),
        name: room.title,
        avatar: room.avatar
      }"
      size="xl"
    />
    <div class="justify-space flex w-full flex-col">
      <div class="flex items-center justify-between">
        <span class="font-bold">{{ room.title }}</span>
        <span class="text-default-500 text-sm" v-if="room.time">
          {{ formatTimeDifference(room.time) }}
        </span>
      </div>

      <div class="flex items-center justify-between text-sm">
        <slot name="system" />
        <span class="line-clamp-1 break-all">
          {{ markdownToText(room.content) }}
        </span>
        <KunBadge color="primary" v-if="room.unreadCount">
          {{ room.unreadCount }}
        </KunBadge>
        <KunBadge color="default" v-if="!room.unreadCount">
          {{ room.count }}
        </KunBadge>
      </div>
    </div>
  </NuxtLink>
</template>
