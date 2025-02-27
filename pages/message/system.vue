<script setup lang="ts">
definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const pageData = reactive({
  page: 1,
  limit: 10,
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
  <div class="container" v-if="data">
    <header>
      <NuxtLink to="/message">
        <Icon class="icon" name="lucide:chevron-left" />
      </NuxtLink>
      <h2>系统消息</h2>
    </header>

    <KunDivider margin="7px 0" />

    <template v-for="(message, index) in data" :key="index">
      <MessageAsideSystem :message="message" />

      <KunDivider margin="7px 0" />
    </template>

    <KunNull :condition="!data.length" type="null" />
  </div>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  a {
    font-size: 24px;
    margin-right: 10px;
    color: var(--kungalgame-font-color-3);

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
