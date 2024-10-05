<script setup lang="ts">
import type { AsideItem } from '~/types/api/chat-message'

const { locale } = useI18n()

defineProps<{
  title: string
  data: AsideItem
}>()
</script>

<template>
  <NuxtLinkLocale
    class="item"
    :to="`/message/${data.route as 'system' | 'notice'}`"
  >
    <NuxtImg src="/apple-touch-icon.png" />
    <div class="info">
      <div class="title">
        <span class="name">{{ title }}</span>
        <span class="time" v-if="data.time">
          {{ formatTimeDifference(data.time, locale) }}
        </span>
      </div>
      <div class="content">
        <slot name="system" />
        <span class="preview">
          {{ markdownToText(data.content) }}
        </span>
        <span v-if="data.unreadCount" class="unread">
          {{ data.unreadCount }}
        </span>
        <span v-if="!data.unreadCount" class="read">{{ data.count }}</span>
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

  img {
    height: 50px;
    width: 50px;
  }

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

    .name {
      font-weight: bold;
    }

    .time {
      font-size: small;
      color: var(--kungalgame-font-color-0);
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

@media (max-width: 700px) {
  .item {
    width: 100%;
  }
}
</style>
