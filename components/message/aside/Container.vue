<script setup lang="ts">
import { asideItems } from './asideItemStore'

const routeName = computed(() => useRoute().name)

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
    :class="
      cn(
        'scrollbar-hide border-default-300 border-r-none flex w-full shrink-0 flex-col space-y-3 overflow-y-auto pr-0 sm:w-88 sm:border-r sm:pr-3',
        routeName !== 'message' ? 'hidden sm:flex' : ''
      )
    "
  >
    <h2 class="px-2 text-2xl">消息</h2>

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

    <div class="block p-2 sm:hidden">
      <h2 class="text-lg">提示</h2>
      <div>本消息系统尚在开发中, 但是功能应该足够用</div>
      <div>如果您有任何问题, 请查看这个话题</div>
      <KunLink
        to="https://www.kungal.com/topic/1650"
        target="_blank"
        class="text-primary underline"
      >
        [公告] 有关论坛消息系统的说明
      </KunLink>
    </div>
  </aside>
</template>
