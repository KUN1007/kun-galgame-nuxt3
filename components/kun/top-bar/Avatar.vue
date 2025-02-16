<script setup lang="ts">
const { name, avatarMin } = storeToRefs(usePersistUserStore())
const { showKUNGalgamePanel, showKUNGalgameUserPanel, messageStatus } =
  storeToRefs(useTempSettingStore())

const onKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    navigateTo('/search')
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="kungalgamer-info">
    <NuxtLink
      class="search"
      aria-label="search"
      v-tooltip="{
        message: '按下 Ctrl + K 以搜索',
        position: 'bottom'
      }"
      to="/search"
    >
      <Icon class="icon" name="lucide:search" />
    </NuxtLink>

    <span class="settings" @click="showKUNGalgamePanel = !showKUNGalgamePanel">
      <Icon class="icon" name="uiw:setting-o" />
    </span>

    <div class="avatar" v-if="name">
      <div>
        <NuxtImg
          class="avatar-image"
          v-if="avatarMin"
          @click="showKUNGalgameUserPanel = true"
          :src="avatarMin"
          :alt="name"
        />
        <div class="status" :class="messageStatus"></div>
      </div>
      <span
        class="guest"
        @click="showKUNGalgameUserPanel = true"
        v-if="!avatarMin"
      >
        {{ name }}
      </span>
    </div>

    <div class="login" v-if="!name">
      <NuxtLink to="/login">登录</NuxtLink>
    </div>

    <LazyKunTopBarUserInfo
      v-if="showKUNGalgameUserPanel"
      @close="showKUNGalgameUserPanel = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.kungalgamer-info {
  display: flex;
  justify-content: center;
  align-items: center;

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-font-color-2);
    font-size: 25px;
    cursor: pointer;
    margin-right: 20px;
  }

  .settings {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-font-color-2);
    font-size: 25px;
    cursor: pointer;
  }
}

.avatar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .guest {
    white-space: nowrap;
    cursor: pointer;
    font-size: medium;
    margin-left: 30px;
    color: var(--kungalgame-font-color-2);

    &:hover {
      color: var(--kungalgame-blue-5);
    }
  }

  .avatar-image {
    margin-left: 30px;
    height: 40px;
    width: 40px;
    cursor: pointer;
    border-radius: 50%;
    position: relative;
  }
}

.login {
  a {
    color: var(--kungalgame-blue-5);
  }
}

.status {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.online {
  background-color: var(--kungalgame-green-4);
}

.offline {
  background-color: var(--kungalgame-blue-5);
}

.new {
  animation: kun-pulse 1s infinite;
  background-color: var(--kungalgame-pink-4);
}

.admin {
  animation: kun-pulse 1s infinite;
  background-color: var(--kungalgame-red-4);
}

.login {
  margin-left: 30px;
  font-weight: bold;
  white-space: nowrap;
}

@keyframes kun-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 1000px) {
  .settings {
    display: none !important;
  }

  .login {
    margin-left: 0;
  }
}

@media (max-width: 700px) {
  .avatar {
    .avatar-image {
      margin-left: 0;
    }
  }
}
</style>
