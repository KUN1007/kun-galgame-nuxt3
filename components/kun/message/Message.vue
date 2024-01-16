<script setup lang="ts">
import dayjs from 'dayjs'
import { getMessageI18n } from './getMessageI18n'
import type { Message } from '~/types/api/message'

const props = defineProps<{
  message: Message[]
  refresh: () => {}
}>()

const { locale } = useI18n()
const activeMessage = ref<number[]>([])

const isShowMoreOperation = (mid: number) => {
  return activeMessage.value.includes(mid)
}

const handelClickShowMoreOperation = (mid: number) => {
  if (!isShowMoreOperation(mid)) {
    activeMessage.value.push(mid)
  } else {
    activeMessage.value = activeMessage.value.filter((item) => item !== mid)
  }
}

const handleClickGoto = (uid: number) => {
  navigateTo(`/kungalgamer/${uid}/info`)
}

const handleMarkAsRead = async (mid: number) => {
  const { data } = await useFetch(`/api/message/read`, {
    method: 'PUT',
    query: { mid },
    watch: false,
    ...kungalgameResponseHandler,
  })

  if (data.value) {
    props.refresh()
    useMessage('Mark as read successfully!', '标记已读成功', 'success')
  }
}
</script>

<template>
  <div class="container">
    <div
      class="message"
      :class="msg.status === 'read' ? 'message-read' : ''"
      v-for="(msg, index) in props.message"
      :key="index"
    >
      <div class="top">
        <div class="status">
          <span class="unread" v-if="msg.status === 'unread'">
            <Icon name="line-md:alert-circle" />
          </span>
          <span class="read" v-if="msg.status === 'read'">
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
          :class="isShowMoreOperation(msg.mid) ? 'more-btn-active' : ''"
          @click="handelClickShowMoreOperation(msg.mid)"
        >
          <Icon name="line-md:chevron-small-right" />
        </span>
      </div>

      <div
        class="more"
        v-if="isShowMoreOperation(msg.mid) && activeMessage.includes(msg.mid)"
      >
        <span @click="handleClickGoto(msg.senderUid)"
          >Goto {{ msg.senderName }}</span
        >
        <span v-if="msg.status === 'unread'" @click="handleMarkAsRead(msg.mid)"
          >Mark as read</span
        >
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
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid var(--kungalgame-pink-4);

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .status {
      .unread {
        color: var(--kungalgame-pink-4);
      }

      .read {
        color: var(--kungalgame-blue-4);
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
  color: var(--kungalgame-pink-4);

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

.more-btn-active {
  transform: rotate(90deg);
  transition: transform 0.2s;
}

.message-read {
  border: 1px solid var(--kungalgame-trans-blue-4);

  .link {
    color: var(--kungalgame-blue-5);
  }
}
</style>
