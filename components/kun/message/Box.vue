<script setup lang="ts">
const { showKUNGalgameMessageBox } = storeToRefs(useTempSettingStore())
const { autoRead } = storeToRefs(usePersistMessageStore())

const startX = ref(0)
const startY = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const isShowFunction = ref(false)

const pageData = reactive({
  page: 1,
  limit: 10,
  order: 'desc'
})

const { data, pending, refresh } = await useFetch(`/api/message/all`, {
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
    useMessage('Read all messages successfully!', '已读所有消息成功', 'success')
  }
}

const handleDeleteAllMessage = async () => {
  const res = await useComponentMessageStore().alert({
    'en-us':
      'Are you sure you want to delete all messages? This action cannot be undone.',
    'ja-jp': '',
    'zh-cn': '您确定要删除所有消息吗？此操作不可撤销'
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
    useMessage(
      'Delete all messages successfully!',
      '删除所有消息成功',
      'success'
    )
  }
}

const handleTouchStart = (event: TouchEvent) => {
  startX.value = event.touches[0].clientX
  startY.value = event.touches[0].clientY
  currentX.value = 0
  isDragging.value = true
}

const handleTouchMove = (event: TouchEvent) => {
  const touchX = event.touches[0].clientX
  const touchY = event.touches[0].clientY
  const deltaX = touchX - startX.value
  const deltaY = touchY - startY.value

  if (deltaY > deltaX) {
    return
  }

  if (deltaX > 0) {
    requestAnimationFrame(() => {
      currentX.value = deltaX
    })
  }
}

const handleTouchEnd = () => {
  isDragging.value = false
  const movedX = currentX.value
  if (Math.abs(movedX) > 30) {
    showKUNGalgameMessageBox.value = false
  }
  currentX.value = 0
}

onBeforeUnmount(async () => {
  const hasUnreadMessage = data.value?.messages.some(
    (message) => message.status === 'unread'
  )
  if (autoRead.value && hasUnreadMessage) {
    await handleReadAllMessage()
  }
})
</script>

<template>
  <div
    class="message-root"
    @touchstart.passive="handleTouchStart"
    @touchmove.passive="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="title">
      <span class="name">{{ $t('header.message.message') }}</span>
      <span class="icon-item" @click="showKUNGalgameMessageBox = false">
        <Icon name="lucide:x" />
      </span>
    </div>

    <div class="auto-read">
      <span>{{ $t('header.message.auto') }}</span>
      <KunSwitch v-model="autoRead" />
    </div>

    <div class="func">
      <span
        class="func-icon"
        :class="isShowFunction ? 'func-icon-active' : ''"
        @click="isShowFunction = !isShowFunction"
      >
        <Icon name="lucide:chevron-right" />
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
        :loading="pending"
        @set-page="(newPage) => (pageData.page = newPage)"
      />
    </KunMessage>
  </div>
</template>

<style lang="scss" scoped>
.message-root {
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  border-left: 1px solid var(--kungalgame-blue-2);
  overflow: scroll;
  width: 342px;

  @include kun-blur;
  border-radius: 5px 0 0 5px;

  &::-webkit-scrollbar {
    width: 0;
  }
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
