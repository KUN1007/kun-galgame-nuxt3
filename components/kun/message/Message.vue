<script setup lang="ts">
import dayjs from 'dayjs'
import { getMessageI18n } from './getMessageI18n'
import type { Message } from '~/types/api/message'

const props = defineProps<{
  message: Message[]
}>()

const { locale } = useI18n()
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
        <span>Read</span>
        <span>Delete</span>
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
  border: 1px solid var(--kungalgame-blue-1);
  border-radius: 5px;
  background-color: var(--kungalgame-trans-blue-0);

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
  }

  .bottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
