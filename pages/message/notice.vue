<script setup lang="ts">
definePageMeta({
  layout: 'message'
})

const isShowFunction = ref(false)

const pageData = reactive({
  page: 1,
  limit: 10,
  order: 'desc'
})

const { data, status, refresh } = await useFetch(`/api/message/all`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

const handleReadAllMessage = async () => {
  const result = await $fetch(`/api/message/read/all`, {
    method: 'PUT',
    ...kungalgameResponseHandler
  })

  if (result) {
    refresh()
    useMessage(10103, 'success')
  }
}

const handleDeleteAllMessage = async () => {
  const res = await useComponentMessageStore().alert({
    'en-us':
      'Are you sure you want to delete all messages? This action cannot be undone.',
    'ja-jp':
      'すべてのメッセージを削除してもよろしいですか？この操作は元に戻せません。',
    'zh-cn': '您确定要删除所有消息吗？此操作不可撤销。',
    'zh-tw': '您確定要刪除所有消息嗎？此操作不可撤銷。'
  })
  if (!res) {
    return
  }

  const result = await $fetch(`/api/message/delete/all`, {
    method: 'DELETE',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    refresh()
    useMessage(10104, 'success')
  }
}

onMounted(async () => {
  const hasUnreadMessage = data.value?.messages.some(
    (message) => message.status === 'unread'
  )
  if (hasUnreadMessage) {
    await handleReadAllMessage()
  }
})
</script>

<template>
  <div class="container">
    <div class="func">
      <span
        class="func-icon"
        :class="isShowFunction ? 'func-icon-active' : ''"
        @click="isShowFunction = !isShowFunction"
      >
        <Icon class="icon" name="lucide:chevron-right" />
      </span>

      <div class="func-container" v-if="isShowFunction">
        <span @click="handleReadAllMessage" class="read">
          {{ $t('header.message.readAll') }}
        </span>
        <span @click="handleDeleteAllMessage" class="delete">
          {{ $t('header.message.deleteAll') }}
        </span>
      </div>
    </div>

    <KunMessage
      v-if="data?.messages"
      :message="data.messages"
      :refresh="refresh"
    >
      <KunPagination
        class="pagination"
        v-if="data?.totalCount"
        :page="pageData.page"
        :limit="pageData.limit"
        :sum="data?.totalCount"
        :status="status"
        @set-page="(newPage) => (pageData.page = newPage)"
      />
    </KunMessage>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 20px;

  .icon-item {
    cursor: pointer;
  }
}

.auto-read {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.func {
  padding: 0 5px;

  .func-icon {
    width: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      color: var(--kungalgame-blue-5);
    }
  }
}

.func-container {
  display: flex;
  flex-direction: column;

  span {
    font-size: 15px;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    color: var(--kungalgame-font-color-3);

    &:nth-child(1) {
      margin-bottom: 5px;

      &:hover {
        background-color: var(--kungalgame-trans-blue-1);
      }
    }

    &:nth-child(2) {
      color: var(--kungalgame-red-5);

      &:hover {
        background-color: var(--kungalgame-red-5);
        color: var(--kungalgame-white);
      }
    }
  }
}

.func-icon-active {
  transform: rotate(90deg);
  transition: transform 0.2s;
}

.pagination {
  padding-bottom: 20px;
}
</style>
