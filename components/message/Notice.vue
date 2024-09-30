<script setup lang="ts">
import dayjs from 'dayjs'
import { getMessageI18n } from './getMessageI18n'
import type { Message } from '~/types/api/message'

const props = defineProps<{
  message: Message
  refresh: () => {}
}>()

const { locale } = useI18n()

const handleDeleteMessage = async (mid: number) => {
  const res = await useComponentMessageStore().alert({
    'en-us':
      'Are you sure you want to delete this message? This action cannot be undone.',
    'ja-jp': 'メッセージを削除してもよろしいですか？この操作は元に戻せません。',
    'zh-cn': '您确定要删除这条消息吗？此操作不可撤销。',
    'zh-tw': '您確定要刪除这条消息嗎？此操作不可撤銷。'
  })
  if (!res) {
    return
  }

  const result = await $fetch(`/api/message/delete`, {
    method: 'DELETE',
    query: { mid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    props.refresh()
    useMessage(10106, 'success')
  }
}
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
      <div>
        <NuxtLinkLocale :to="`/kungalgamer/${message.sender.uid}/info`">
          {{ message.sender.name }}
        </NuxtLinkLocale>
        <span>{{ getMessageI18n(locale as Language, message) }}</span>
      </div>
    </div>

    <div class="content">
      <KunAvatar :user="message.sender" size="32px" />

      <NuxtLinkLocale
        class="link"
        :to="message.tid ? `/topic/${message.tid}` : `/galgame/${message.gid}`"
      >
        <pre class="detail">{{ markdownToText(message.content) }}</pre>
      </NuxtLinkLocale>
    </div>

    <div class="bottom">
      <span class="time">
        {{ dayjs(message.time).format('MM-D-YYYY - HH:mm:ss') }}
      </span>

      <span @click="handleDeleteMessage(message.mid)">
        <Icon class="icon" name="lucide:trash-2" />
      </span>
    </div>
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
        color: var(--kungalgame-pink-4);
      }

      .read {
        color: var(--kungalgame-blue-5);
      }
    }

    a {
      color: var(--kungalgame-blue-5);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  .content {
    display: flex;
    margin: 10px 0;
  }

  .bottom {
    display: flex;
    justify-content: space-between;

    span {
      &:first-child {
        user-select: none;
        font-size: small;
        color: var(--kungalgame-font-color-0);
      }

      &:last-child {
        cursor: pointer;
        font-size: 18px;
        color: var(--kungalgame-red-5);
      }
    }
  }
}

.link {
  cursor: pointer;
  color: var(--kungalgame-font-color-2);

  &:hover {
    color: var(--kungalgame-blue-5);
  }
}

.detail {
  margin: 0;
  margin-left: 10px;
  padding: 5px;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
