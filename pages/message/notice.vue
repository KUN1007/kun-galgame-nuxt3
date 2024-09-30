<script setup lang="ts">
definePageMeta({
  layout: 'message'
})

const pageData = reactive({
  page: 1,
  limit: 10,
  order: 'desc'
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
    await $fetch(`/api/message/read/all`, {
      method: 'PUT',
      ...kungalgameResponseHandler
    })
  }
})
</script>

<template>
  <div class="container" v-if="data">
    <template v-for="(message, index) in data.messages" :key="index">
      <MessageNotice :message="message" :refresh="refresh" />

      <KunDivider margin="7px 0" />
    </template>

    <KunPagination
      class="pagination"
      v-if="data?.totalCount"
      :page="pageData.page"
      :limit="pageData.limit"
      :sum="data?.totalCount"
      :status="status"
      @set-page="(newPage) => (pageData.page = newPage)"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>
