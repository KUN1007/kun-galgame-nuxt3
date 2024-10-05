<script setup lang="ts">
import type { Message } from '~/types/api/chat-message'

defineProps<{
  message: Message
  isSent: boolean
}>()

const { locale } = useI18n()
</script>

<template>
  <div class="message-item" :class="isSent ? 'sent' : 'others'">
    <KunAvatar :user="message.sender" size="30px" />

    <div class="content-container">
      <div class="top">
        <span class="username">
          {{ message.sender.name }}
        </span>
      </div>
      <div class="content">
        <span>{{ message.content }}</span>
        <span class="time">
          {{ formatTimeDifference(message.time, locale as Language) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-item {
  display: flex;
  width: 100%;

  .kun-avatar {
    margin-top: auto;
  }

  .top {
    display: flex;
    align-items: end;
  }

  .username {
    color: var(--kungalgame-pink-4);
  }
}

.content-container {
  background-color: var(--kungalgame-trans-white-5);
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 75%;
  font-size: 14px;
  margin: 0 10px;
  position: relative;
  line-height: 1.4;
  box-shadow: var(--shadow);

  .time {
    font-size: 12px;
    margin-left: 10px;
    margin-right: 5px;
    color: var(--kungalgame-font-color-1);
  }

  .icon {
    transform: translateY(3px);
    color: var(--kungalgame-font-color-1);
  }
}

.message-item + .message-item {
  margin-top: 5px;
}

.sent + .others,
.others + .sent {
  margin-top: 10px;
}

.sent {
  justify-content: flex-start;
  flex-direction: row-reverse;

  .content-container {
    background-color: var(--kungalgame-trans-blue-2);
  }

  .username {
    color: var(--kungalgame-blue-5);
  }
}
</style>
