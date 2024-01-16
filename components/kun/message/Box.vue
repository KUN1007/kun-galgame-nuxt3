<script setup lang="ts">
import type { KunMessage } from '#build/components'

const { showKUNGalgameMessageBox } = storeToRefs(useTempSettingStore())

const getMessages = async () => {
  const data = await useFetch(`/api/message`, {
    method: 'GET',
    query: {
      page: '1',
      limit: '10',
      type: '',
      sortOrder: 'desc',
    },
    watch: false,
    ...kungalgameResponseHandler,
  })
  return data
}

const { data: messageData } = await getMessages()
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

      <KunMessage v-if="messageData" :message="messageData" />
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
</style>
