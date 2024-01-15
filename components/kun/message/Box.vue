<script setup lang="ts">
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

      <div class="container" v-if="messageData">
        <div class="message" v-for="(msg, index) in messageData" :key="index">
          <div class="top">
            <span class="status">
              <Icon name="line-md:alert-circle" />
              <Icon name="line-md:confirm-circle" />
            </span>
            <span class="time">{{ msg.time }}</span>
          </div>

          <div class="content">
            <!-- Your post was ${actionType} by ${actionUserId} -->
            {{ msg.content }}
          </div>

          <div class="bottom">
            <span>Read</span>
            <span>Delete</span>
          </div>
        </div>
      </div>
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

.container {
  padding: 10px;
}

.message {
  padding: 10px;
  border: 1px solid var(--kungalgame-blue-1);
  border-radius: 5px;
  background-color: var(--kungalgame-trans-blue-0);

  .top {
    display: flex;
    justify-content: space-between;
  }

  .content {
    margin-top: 10px;
    margin-bottom: 10px;
    word-break: break-all;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
