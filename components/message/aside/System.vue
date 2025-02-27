<script setup lang="ts">
import type { MessageAdmin } from '~/types/api/message-admin'

defineProps<{
  message: MessageAdmin
}>()
</script>

<template>
  <div class="message" :class="message.status === 'read' ? 'message-read' : ''">
    <div class="title">
      <div class="status">
        <Icon
          class="unread"
          v-if="message.status === 'unread'"
          name="lucide:info"
        />
        <Icon
          class="read"
          v-if="message.status === 'read'"
          name="lucide:check-check"
        />
      </div>
      <KunAvatar :user="message.admin" size="32px" />
      <span class="time">
        {{ formatTimeDifference(message.time) }}
      </span>
    </div>

    <div class="content" v-html="message.content['zh-cn']" />
  </div>
</template>

<style lang="scss" scoped>
.message {
  padding: 10px;
  border-radius: 5px;

  .title {
    word-break: break-all;
    display: flex;
    align-items: center;

    .status {
      display: flex;
      margin-right: 10px;
      font-size: 18px;

      .unread {
        color: var(--kungalgame-red-5);
      }

      .read {
        color: var(--kungalgame-blue-5);
      }
    }

    .time {
      color: var(--kungalgame-font-color-0);
      font-size: small;
      font-weight: initial;
      margin-left: 17px;
      white-space: nowrap;
    }
  }

  .content {
    margin-top: 10px;
    word-break: break-all;
    line-height: 1.5rem;
  }
}
</style>
