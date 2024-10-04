<script setup lang="ts">
import type { AsideItem } from '~/types/api/message'

const { locale } = useI18n()

defineProps<{
  room: AsideItem
}>()

// const itemData = reactive({})

// onMounted(async () => {
//   socket.on('receivedMessage', (msg: Message) => {})
// })
</script>

<template>
  <NuxtLinkLocale class="item" :to="`/message/user/${room.route}`">
    <KunAvatar
      :user="{
        uid: parseInt(room.route),
        name: room.title,
        avatar: room.avatar
      }"
      size="50px"
    />
    <div class="info">
      <div class="title">
        <span>{{ room.title }}</span>
        <span v-if="room.time">
          {{ formatTimeDifference(room.time, locale) }}
        </span>
      </div>
      <div class="content">
        <slot name="system" />
        <span class="preview">
          {{ markdownToText(room.content) }}
        </span>
        <span v-if="room.unreadCount" class="unread">
          {{ room.unreadCount }}
        </span>
        <span v-if="!room.unreadCount" class="read">{{ room.count }}</span>
      </div>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  padding: 10px;
  width: 20rem;
  border-radius: 10px;
  cursor: pointer;
  color: var(--kungalgame-font-color-3);

  &:hover {
    background-color: var(--kungalgame-trans-blue-0);
  }
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  width: 100%;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      &:first-child {
        font-weight: bold;
      }

      &:last-child {
        font-size: small;
        color: var(--kungalgame-font-color-0);
      }
    }
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: small;
    }

    .preview {
      color: var(--kungalgame-font-color-0);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .read,
    .unread {
      margin-left: auto;
      font-size: 12px;
      background-color: var(--kungalgame-gray-4);
      color: var(--kungalgame-white);
      border-radius: 10px;
      padding: 2px 4px;
    }

    .unread {
      background-color: var(--kungalgame-blue-5);
    }
  }
}
</style>
