<script setup lang="ts">
import dayjs from 'dayjs'
import { getMessageI18n } from './getMessageI18n'
import type { Message } from '~/types/api/message'

const props = defineProps<{
  message: Message[]
}>()

const { locale } = useI18n()
const isShowMoreOperation = ref(false)
</script>

<template>
  <div class="container">
    <div class="message" v-for="(msg, index) in props.message" :key="index">
      <div class="top">
        <div class="status">
          <span v-if="msg.status === 'unread'">
            <Icon name="line-md:alert-circle" />
          </span>
          <span v-if="msg.status === 'read'">
            <Icon name="line-md:confirm-circle" />
          </span>
        </div>

        <span class="time">
          {{ dayjs(msg.time).format('MM-D-YYYY - h:mm:ss') }}
        </span>
      </div>

      <div class="content" v-html="getMessageI18n(locale, msg)"></div>

      <div class="bottom">
        <NuxtLink v-if="msg.tid" class="link" :to="`/topic/${msg.tid}`">
          Link
        </NuxtLink>
        <span
          class="more-btn"
          :class="isShowMoreOperation ? 'more-active' : ''"
          @click="isShowMoreOperation = !isShowMoreOperation"
        >
          <Icon name="line-md:chevron-small-right" />
        </span>
      </div>

      <div class="more" v-if="isShowMoreOperation">
        <span>Goto {{ msg.senderName }}</span>
        <span>Mark as read</span>
        <span>Delete message</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 10px;
}

.message {
  padding: 10px;
  border: 1px solid var(--kungalgame-blue-4);
  border-radius: 5px;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .status {
      span {
        &:nth-child(1) {
          color: var(--kungalgame-pink-4);
        }

        &:nth-child(2) {
          color: var(--kungalgame-blue-4);
        }
      }
    }

    .time {
      font-size: 13px;
    }
  }

  .content {
    margin-top: 10px;
    margin-bottom: 10px;
    word-break: break-all;

    :deep(a) {
      color: var(--kungalgame-blue-4);

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
  }
}

.link {
  cursor: pointer;
  color: var(--kungalgame-blue-5);

  &:hover {
    text-decoration: underline;
  }
}

.more-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    color: var(--kungalgame-blue-4);
  }
}

.more {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background-color: var(--kungalgame-trans-blue-1);
    }
  }
}

.more-active {
  transform: rotate(90deg);
  transition: transform 0.2s;
}
</style>
