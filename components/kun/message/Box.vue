<script setup lang="ts">
import type { KunMessage } from '#build/components'

const messageStore = useTempMessageStore()
const { showKUNGalgameMessageBox } = storeToRefs(useTempSettingStore())
const isShowFunction = ref(false)

const getMessages = async () => {
  const data = await useFetch(`/api/message/all`, {
    method: 'GET',
    query: {
      page: '1',
      limit: '10',
      sortOrder: 'desc',
    },
    watch: false,
    ...kungalgameResponseHandler,
  })
  return data
}

const { data: messageData, refresh } = await getMessages()

const handleReadAllMessage = async () => {
  const { data } = await useFetch(`/api/message/read/all`, {
    method: 'PUT',
    watch: false,
    ...kungalgameResponseHandler,
  })

  if (data.value) {
    refresh()
    useMessage('Read all messages successfully!', '已读所有消息成功', 'success')
  }
}

const handleDeleteAllMessage = async () => {
  const res = await messageStore.alert('AlertInfo.message.delete', true)
  if (!res) {
    return
  }

  const { data } = await useFetch(`/api/message/delete/all`, {
    method: 'DELETE',
    watch: false,
    ...kungalgameResponseHandler,
  })

  if (data.value) {
    refresh()
    useMessage(
      'Delete all messages successfully!',
      '删除所有消息成功',
      'success'
    )
  }
}
</script>

<template>
  <Transition
    enter-active-class="animate__animated animate__fadeInRight animate__faster"
    leave-active-class="animate__animated animate__fadeOutRight animate__faster"
  >
    <div class="root" v-if="showKUNGalgameMessageBox">
      <div class="title">
        <span class="name">Message</span>
        <span class="icon-item" @click="showKUNGalgameMessageBox = false">
          <Icon name="line-md:close" />
        </span>
      </div>

      <div class="func">
        <span
          class="func-icon"
          :class="isShowFunction ? 'func-icon-active' : ''"
          @click="isShowFunction = !isShowFunction"
        >
          <Icon name="line-md:chevron-small-right" />
        </span>

        <div class="func-container" v-if="isShowFunction">
          <span @click="handleReadAllMessage" class="read"
            >Mark All Messages as Read</span
          >
          <span @click="handleDeleteAllMessage" class="delete">
            Delete All Messages
          </span>
        </div>
      </div>

      <KunMessage
        v-if="messageData"
        :message="messageData"
        :refresh="refresh"
      />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.root {
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  min-height: 100vh;
  border-left: 1px solid var(--kungalgame-blue-1);
  border-radius: 5px 0 0 5px;
  background-color: var(--kungalgame-trans-white-2);
  color: var(--kungalgame-font-color-3);
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

.func {
  padding: 0 5px;

  .func-icon {
    width: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      color: var(--kungalgame-blue-4);
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
</style>
