<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useKunSeoMeta({
  title: '系统消息'
})

const pageData = reactive({
  page: 1,
  limit: 30,
  order: 'desc'
})

const { data } = await useFetch(`/api/message/admin`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

onMounted(async () => {
  const hasUnreadMessage = data.value?.some(
    (message) => message.status === 'unread'
  )
  if (hasUnreadMessage) {
    await $fetch(`/api/message/admin/read`, {
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
      <h2 class="text-lg">系统消息</h2>
    </header>

    <KunDivider />

    <div v-if="data.length" class="scrollbar-hide h-full overflow-y-auto">
      <MessageAsideSystem
        v-for="(message, index) in data"
        :key="index"
        :message="message"
      />
    </div>

    <KunNull v-if="!data.length" />
  </div>
</template>
