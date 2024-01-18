<script setup lang="ts">
import { topBarItem } from './topBarItem'
import 'animate.css'

const Hamburger = defineAsyncComponent(() => import('./Hamburger.vue'))
const KUNGalgameSettingsPanel = defineAsyncComponent(
  () => import('../setting-panel/SettingPanel.vue')
)
const KUNGalgameUserInfo = defineAsyncComponent(() => import('./UserInfo.vue'))
const MessageBox = defineAsyncComponent(() => import('../message/Box.vue'))

const { isShowSearch } = storeToRefs(useTempHomeStore())
const { name, avatarMin } = storeToRefs(useKUNGalgameUserStore())
const {
  showKUNGalgameHamburger,
  showKUNGalgamePanel,
  showKUNGalgameMessageBox,
  showKUNGalgameUserPanel,
  messageStatus,
} = storeToRefs(useTempSettingStore())
const route = useRoute()

const navItemNum = topBarItem.length
const navItemLength = `${navItemNum}00px`

watch(
  () => route.name,
  () => {
    useTempSettingStore().reset()
  }
)

onMounted(() => {
  const socket = useIO()()
  socket.emit('register')

  socket.on('connect', () => {
    messageStatus.value = 'online'
  })

  socket.on('disconnect', () => {
    messageStatus.value = 'offline'
  })

  // TODO: Toast message info
  socket.on('upvoted', (socket) => {
    messageStatus.value = 'new'
  })

  socket.on('liked', (socket) => {
    messageStatus.value = 'new'
  })

  socket.on('replied', (socket) => {
    messageStatus.value = 'new'
  })

  socket.on('commented', (socket) => {
    messageStatus.value = 'new'
  })
})
</script>

<template>
  <div class="header">
    <div class="nav-top">
      <div class="hamburger">
        <Icon
          name="line-md:menu-fold-right"
          v-if="!showKUNGalgameHamburger"
          @click="showKUNGalgameHamburger = !showKUNGalgameHamburger"
        />
        <Transition name="hamburger">
          <Hamburger
            v-if="showKUNGalgameHamburger"
            @close="showKUNGalgameHamburger = false"
          />
        </Transition>
      </div>

      <Transition
        enter-active-class="animate__animated animate__fadeInRight animate__faster"
        leave-active-class="animate__animated animate__fadeOutRight animate__faster"
      >
        <MessageBox v-if="showKUNGalgameMessageBox" />
      </Transition>

      <div class="kungalgame">
        <NuxtLink to="/">
          <NuxtImg src="/favicon.webp" alt="KUN Visual Novel | 鲲 Galgame" />
          <span>{{ $t('header.name') }}</span>
        </NuxtLink>
      </div>

      <div class="top-bar">
        <span v-for="kun in topBarItem" :key="kun.index">
          <NuxtLink :to="{ path: kun.router }">
            {{ $t(`header.${kun.name}`) }}
          </NuxtLink>
        </span>

        <div class="box"></div>
      </div>
    </div>

    <div class="kungalgamer-info">
      <span class="search" @click="isShowSearch = true">
        <Icon name="line-md:search" />
      </span>

      <span
        class="settings"
        @click="showKUNGalgamePanel = !showKUNGalgamePanel"
      >
        <Icon name="uiw:setting-o" />
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
        <NuxtLink to="/login">{{ $t('login.login.loginTitle') }}</NuxtLink>
      </div>

      <KUNGalgameUserInfo
        v-if="showKUNGalgameUserPanel"
        @close="showKUNGalgameUserPanel = false"
      />
    </div>
  </div>

  <div class="settings-panel">
    <Transition
      enter-active-class="animate__animated animate__jackInTheBox animate__faster"
      leave-active-class="animate__animated animate__fadeOutRight animate__faster"
    >
      <KeepAlive :exclude="['PageWidth', 'Font']">
        <KUNGalgameSettingsPanel
          v-if="showKUNGalgamePanel"
          @close="showKUNGalgamePanel = false"
        />
      </KeepAlive>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 58px;
  box-shadow: 0 2px 4px 0 var(--kungalgame-trans-blue-1);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  margin-bottom: 7px;
  flex-shrink: 0;
  color: var(--kungalgame-font-color-3);
}

.hamburger {
  display: none;
  margin-top: 10px;
  margin-left: 40px;
  font-size: 25px;
  cursor: pointer;
}

.nav-top {
  display: flex;
  align-items: center;
  height: 100%;
}

$navNumber: v-bind(navItemNum);

.top-bar {
  position: relative;
  text-align: center;
  width: v-bind(navItemLength);
  align-items: center;
  display: flex;

  .box {
    border-radius: 2px;
    bottom: 0;
    height: 7px;
    left: 0;
    position: absolute;
    transition: 0.5s;
    width: calc(100% / $navNumber);

    &:hover {
      z-index: -1;
    }
  }

  a {
    display: block;
    color: var(--kungalgame-blue-5);
    width: 100%;
    height: 100%;
  }

  span {
    cursor: pointer;
    display: block;
    font-weight: bold;
    line-height: 58px;
    width: 100%;

    &:nth-child(1):hover ~ .box {
      background-color: var(--kungalgame-red-3);
      left: calc(100% / $navNumber * 0);
    }

    &:nth-child(2):hover ~ .box {
      background-color: var(--kungalgame-blue-3);
      left: calc(100% / $navNumber * 1);
    }

    &:nth-child(3):hover ~ .box {
      background-color: var(--kungalgame-yellow-2);
      left: calc(100% / $navNumber * 2);
    }

    &:nth-child(4):hover ~ .box {
      filter: hue-rotate(240deg);
      background-color: var(--kungalgame-blue-3);
      left: calc(100% / $navNumber * 3);
    }

    &:nth-child(5):hover ~ .box {
      filter: hue-rotate(60deg);
      background-color: var(--kungalgame-blue-3);
      left: calc(100% / $navNumber * 4);
    }
  }
}

.kungalgame {
  display: flex;
  align-items: center;
  margin-left: 50px;

  a {
    display: flex;
    align-items: center;
    color: var(--kungalgame-font-color-3);

    img {
      width: 50px;
      height: 50px;
      margin-right: 30px;
    }
  }
}

.kungalgamer-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;

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
  background-color: var(--kungalgame-blue-4);
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

.settings-panel {
  z-index: 999;
}

.hamburger-enter-from {
  opacity: 0;
}

.hamburger-leave-to {
  opacity: 0;
}

.hamburger-enter-from .container,
.hamburger-leave-to .container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
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
  .kungalgame {
    span {
      display: none;
    }
    img {
      margin-right: 0 !important;
    }
  }

  .settings {
    display: none !important;
  }

  .login {
    margin-left: 0;
  }
}

@media (max-width: 700px) {
  .top-bar {
    display: none;
  }
  .kungalgame {
    display: none;
  }
  .hamburger {
    display: block;
    margin-left: 30px;
  }

  .kungalgamer-info {
    margin-right: 30px;
  }

  .avatar {
    img {
      margin-left: 0;
    }
  }
}
</style>
