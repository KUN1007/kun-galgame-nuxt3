<script setup lang="ts">
import { topBarItem } from './topBarItem'
import 'animate.css'

const Hamburger = defineAsyncComponent(() => import('./Hamburger.vue'))
const MessageBox = defineAsyncComponent(() => import('../message/Box.vue'))

const { showKUNGalgameHamburger, showKUNGalgameMessageBox, messageStatus } =
  storeToRefs(useTempSettingStore())
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
  /*
   * disable HTTP long-polling on the client-side
   * See: https://socket.io/docs/v4/pm2/
   */
  const socket = useIO()({
    transports: ['websocket'],
  })
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
  <div class="nav-top">
    <div class="hamburger">
      <Icon
        name="line-md:menu-fold-right"
        v-if="!showKUNGalgameHamburger"
        @click="showKUNGalgameHamburger = true"
      />

      <Transition name="hamburger">
        <Hamburger v-if="showKUNGalgameHamburger" />
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
</template>

<style lang="scss" scoped>
.hamburger {
  display: none;
  margin-left: 20px;
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

@media (max-width: 1000px) {
  .kungalgame {
    span {
      display: none;
    }
    img {
      margin-right: 0 !important;
    }
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
  }
}
</style>
