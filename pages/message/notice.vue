<script setup lang="ts">
definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const router = useRouter()

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
    <header>
      <Icon @click="router.back()" class="icon" name="lucide:chevron-left" />
      <h2>{{ $t('message.name') }}</h2>
    </header>

    <KunDivider margin="7px 0" />

    <template
      v-show="data.totalCount"
      v-for="(message, index) in data.messages"
      :key="index"
    >
      <MessageNotice :message="message" :refresh="refresh" />

      <KunDivider margin="7px 0" />
    </template>

    <KunNull :condition="!data.totalCount" type="null" />

    <KunPagination
      class="pagination"
      v-if="data.totalCount"
      :page="pageData.page"
      :limit="pageData.limit"
      :sum="data.totalCount"
      :status="status"
      @set-page="(newPage) => (pageData.page = newPage)"
    />
  </div>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  span {
    cursor: pointer;
    font-size: 24px;
    margin-right: 10px;

    &:hover {
      color: var(--kungalgame-blue-5);
    }
  }

  h2 {
    &::before {
      content: '';
      margin: 0;
    }
  }
}

.container {
  width: 100%;
}
</style>
