<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useKunSeoMeta({
  title: '通知消息'
})

const pageData = reactive({
  page: 1,
  limit: 30,
  sortOrder: 'desc'
})

const { data, status, refresh } = await useFetch(`/api/message`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

onMounted(async () => {
  const hasUnreadMessage = data.value?.messages.some(
    (message) => message.status === 'unread'
  )
  if (hasUnreadMessage) {
    await $fetch(`/api/message/system/read`, {
      method: 'PUT',
      ...kungalgameResponseHandler
    })
  }
})
</script>

<template>
  <div class="flex w-full flex-col space-y-3" v-if="data">
    <header class="flex items-center gap-2">
      <KunButton size="lg" :is-icon-only="true" variant="light" href="/message">
        <KunIcon name="lucide:chevron-left" />
      </KunButton>
      <h2 class="text-lg">通知</h2>
    </header>

    <KunDivider />

    <div
      v-if="data.messages.length"
      class="scrollbar-hide h-full overflow-y-auto"
    >
      <MessageAsideNotice
        v-for="(message, index) in data.messages"
        :key="index"
        :message="message"
        :refresh="refresh"
      />
    </div>

    <KunNull v-if="!data.totalCount" />

    <KunPagination
      v-if="data.totalCount"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </div>
</template>
