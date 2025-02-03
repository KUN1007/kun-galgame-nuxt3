<script setup lang="ts">
const props = defineProps<{
  uid: number
}>()

const socket = useSocketIO()

const res = await $fetch(`/api/user/${props.uid}`, {
  method: 'GET',
  ...kungalgameResponseHandler
})

const user = {
  uid: props.uid,
  name: typeof res !== 'string' ? res.name : '',
  avatar: typeof res !== 'string' ? res.avatar : ''
}

const handleReload = () => location.reload()
</script>

<template>
  <header>
    <NuxtLink to="/message">
      <Icon class="icon" name="lucide:chevron-left" />
    </NuxtLink>
    <KunAvatar :user="user" size="30px" />
    <h2 class="username">
      <span>{{ user.name }}</span>
      <span
        class="status"
        :class="socket.connected ? 'connected' : 'disconnected'"
      />
      <span
        class="offline"
        v-if="!socket.connected"
        @click="handleReload"
        v-tooltip="{
          message: {
            'en-us': `Click to refresh the page, but it's okay if you don't refresh it.`,
            'ja-jp': 'クリックしてページを更新、更新しなくても大丈夫です',
            'zh-cn': '点击刷新页面, 不刷新也可以',
            'zh-tw': '點擊刷新頁面, 不刷新也可以'
          },
          position: 'bottom'
        }"
      >
        <span>{{ $t('message.offline') }}</span>
        <Icon name="lucide:refresh-ccw" />
      </span>
    </h2>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
  height: 32px;

  a {
    font-size: 24px;
    margin-right: 10px;
    color: var(--kungalgame-font-color-3);
    @include kun-center;

    &:hover {
      color: var(--kungalgame-blue-5);
    }
  }

  .username {
    margin-left: 10px;
    position: relative;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      margin: 0;
    }
  }

  .status {
    position: absolute;
    right: -24px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }

  .connected {
    background-color: var(--kungalgame-green-4);
  }

  .disconnected {
    background-color: var(--kungalgame-red-4);
  }

  .offline {
    margin-left: 10px;
    font-size: initial;
    font-weight: 500;
    color: var(--kungalgame-font-color-0);
    cursor: pointer;

    span {
      &:last-child {
        margin-left: 4px;
      }
    }
  }
}
</style>
