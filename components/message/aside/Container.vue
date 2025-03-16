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
  <aside
    class="scrollbar-hide border-default-300 flex w-88 shrink-0 flex-col space-y-3 overflow-y-auto border-r pr-3"
  >
    <h2 class="text-2xl">消息</h2>

    <KunDivider />

    <MessageAsideSystemItem v-if="system" title="通知" :data="system[0]" />

    <MessageAsideSystemItem v-if="system" title="系统消息" :data="system[1]">
      <template #system>
        <span v-if="!system[1].unreadCount" class="zako">杂鱼~♡</span>
        <span v-if="system[1].unreadCount" class="new">
          {{ `「 新消息 」` }}
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
