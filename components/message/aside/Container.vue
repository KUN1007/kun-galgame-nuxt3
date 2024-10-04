<script setup lang="ts">
import { asideItems } from './asideItemStore'

const { data: system } = await useFetch(`/api/message/nav/system`, {
  method: 'GET',
  ...kungalgameResponseHandler
})

const { data: contact } = await useFetch(`/api/message/nav/contact`, {
  method: 'GET',
  ...kungalgameResponseHandler
})

asideItems.value = contact.value ? contact.value : []
</script>

<template>
  <aside class="aside">
    <h2>Message</h2>

    <KunDivider margin="10px 0" />

    <MessageAsideSystemItem
      v-if="system"
      :title="$t('message.notice')"
      :data="system[0]"
    />

    <MessageAsideSystemItem
      v-if="system"
      :title="$t('message.system')"
      :data="system[1]"
    >
      <template #system>
        <span v-if="!system[1].unreadCount" class="zako">
          {{ $t('topic.panel.reply') }}
        </span>
        <span v-if="system[1].unreadCount" class="new">
          {{ `「 ${$t('message.new')} 」` }}
        </span>
      </template>
    </MessageAsideSystemItem>

    <MessageAsideItem
      v-for="(room, index) in asideItems"
      :key="index"
      :room="room"
    />
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
