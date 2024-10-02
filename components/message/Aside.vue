<script setup lang="ts">
import type { MessageAsideStatus, AsideItem } from '~/types/api/message'

const { data } = await useFetch(`/api/message/status`, {
  method: 'GET',
  ...kungalgameResponseHandler
})

const getMessageItem = (
  data: MessageAsideStatus,
  type: 'notice' | 'system'
): AsideItem => {
  const item = data[type]
  return {
    time: item.time,
    content: 'content' in item ? item.content : '',
    unreadCount: item.unreadCount,
    count: item.count
  }
}
</script>

<template>
  <aside class="aside">
    <h2>Message</h2>

    <KunDivider margin="10px 0" />

    <MessageItem
      v-if="data"
      type="notice"
      :title="$t('message.notice')"
      :data="getMessageItem(data, 'notice')"
    />

    <MessageItem
      v-if="data"
      type="system"
      :title="$t('message.system')"
      :data="getMessageItem(data, 'system')"
    >
      <template #system>
        <span v-if="!data.system.unreadCount" class="zako">
          {{ $t('topic.panel.reply') }}
        </span>
        <span v-if="data.system.unreadCount" class="new">
          {{ `「 ${$t('message.new')} 」` }}
        </span>
      </template>
    </MessageItem>

    <MessagePmUser />
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  height: 100%;
  color: var(--kungalgame-font-color-3);
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  padding: 10px;
  @include kun-blur;
}

span {
  font-size: small;
}

.zako {
  color: var(--kungalgame-font-color-0);
}

.new {
  color: var(--kungalgame-red-5);
}
</style>
